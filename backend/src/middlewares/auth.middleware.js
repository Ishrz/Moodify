const jwt =require("jsonwebtoken")


const authUser = async (req, res , next) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized access , token not provided"
        })
    }

    let decoded;
    try {
        decoded = await jwt.verify(token , process.env.JWT_SECRET)
    } catch (error) {
        console.log("faild to verify token at auth with error : " + error)
        return res.status(401).json({
            message: "Unathurized access , token verification faild"
        })
    }

    console.log(decoded)
    req.user = decoded
    next()

}


module.exports = authUser