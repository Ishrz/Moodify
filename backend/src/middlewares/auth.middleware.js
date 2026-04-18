const jwt =require("jsonwebtoken")
const BlacklistModel = require("../models/blacklist.model")


const authUser = async (req, res , next) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized access , token not provided"
        })
    }

    const isTokenBlackListed = await BlacklistModel.findOne({token:token})

    // console.log("from auth middleware")
    // console.log(isTokenBlackListed)

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