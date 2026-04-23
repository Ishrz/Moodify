const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")
const logger = require("./middlewares/logger.js")

//routes
const authRoute = require("./routes/auth.route.js")
const uploadSongRoute = require("./routes/song.route.js")

const app = express()

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}

// app.use(morgan('combined'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//auth router
//http://localhost:4000/api/v1
app.use("/api/v1/auth" , authRoute)

//upload router
//http://localhost:4000/api/v1/song
app.use("/api/v1/song" , uploadSongRoute)


module.exports= app