const jwt =require("jsonwebtoken")
const BlacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache.js")


const authUser = async (req, res , next) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized access , token not provided"
        })
    }

    //checking blacklisted token in mongoDB database
    // const isTokenBlackListed = await BlacklistModel.findOne({token:token})

    //checking blacklisted token in Redis database
    const isTokenBlackListed = await redis.get(token)
  


    if(isTokenBlackListed){
        return res.status(401).json({
            message: "Unathorized access please login again"
        })
    }

    

    // return

    let decoded;
    try {
        decoded = await jwt.verify(token , process.env.JWT_SECRET)
    } catch (error) {
        console.log("faild to verify token at auth with error : " + error)
        return res.status(401).json({
            message: "Unathurized access , token verification faild"
        })
    }

    
    req.user = decoded
    next()

}


module.exports = authUser