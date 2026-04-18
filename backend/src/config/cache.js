const Redis = require("ioredis").default
require("dotenv").config()

const redis = new Redis({
    host:process.env.REDIS_URI,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
})


redis.on("connect" , ()=>{
    console.log("Redis is connected to server")
})

redis.on("error" , (error)=>{
    console.log("error is occur in redis connection : ERROR" )
    console.log( error.message)
})


module.exports = redis