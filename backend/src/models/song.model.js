const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url:{
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
    }
})


const SongModel = mongoose.model("songs" , songSchema)


module.exports = SongModel