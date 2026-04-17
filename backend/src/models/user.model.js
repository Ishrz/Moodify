const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
   username : {
    type: String , 
    require : [true , "username is required"] , 
    unique : [true , "unique username is required"]
   },
   email:{
    type : String,
    require : [true , " Email id is required"] ,
    unique : [true , "unique Email id required"]
   },
   password : {
    type: String , 
    require : [true , "Password is reqired"],
    select:false
   }
})


const UserModel = mongoose.model("User" , userSchema)

module.exports = UserModel