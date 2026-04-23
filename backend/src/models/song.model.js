const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    songUrl:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["happy", "sad" , "surprised"],
            message:"enum is a"
        }
        
    }
})


const SongModel = mongoose.model("songs" , songSchema)


module.exports = SongModel