const UserModel = require("../models/user.model");
const BlacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isUserExist = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserExist) {
      return res.status(400).json({
        message: `try diffrenet name and email id`,
      });
    }

    //hashing pass
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await UserModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1D",
      }
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "user created successfuly",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(
      "something went wrong at registrations please try after sometime"
    );
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    }).select("+password");

    if (!isUserExist) {
      return res.status(400).json({
        message: "Invalid credential",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        id: isUserExist._id,
        username: isUserExist.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1D",
      }
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user login successfuly",
      user: {
        id: isUserExist._id,
        username: isUserExist.username,
        email: isUserExist.email,
      },
    });
  } catch (error) {
    console.log("something went wrong at login controller with ERROR" + error);
  }
};

const getMe = async (req, res) => {
  const userData = req.user;

  const user = await UserModel.findOne({ _id: userData.id });

  res.status(200).json({
    message: "user fetch successfuly",
    user: user,
  });
};

const logOut = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");


  //saving logOut token in mongoDB in Blacklist document
//   const savedToken = await BlacklistModel.create({
//     token,
//   });

//   saving logOut token in redis
if (token) {
  const redisData = await redis.set(token, Date.now().toString() , "EX" , 60*60*24);
}


  return res.status(200).json({
    message: "User LogOut Successfuly",
  });
};

module.exports = {
  registration,
  login,
  getMe,
  logOut,
};
