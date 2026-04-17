const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const logger = require("./middlewares/logger.js")

//routes
const authRoute = require("./routes/auth.route.js")

const app = express()

// app.use(morgan('combined'))
app.use(express.json())
app.use(cookieParser())


app.use("/api/v1" , authRoute)



module.exports= app