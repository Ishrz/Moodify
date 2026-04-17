const mongoose = require("mongoose")


const dbConnection =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is Connected")
    } catch (error) {
        console.log("Database connection faild ERROR: " + error )
    }
}

module.exports= dbConnection