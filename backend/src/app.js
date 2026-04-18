const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")
const logger = require("./middlewares/logger.js")

//routes
const authRoute = require("./routes/auth.route.js")

const app = express()

// app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use("/api/v1" , authRoute)



module.exports= app