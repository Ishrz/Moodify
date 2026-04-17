const express = require("express")
const cookieParser = require("cookieparser")
const morgan = require("morgan")


const app = express()

app.use(express.json())
app.use(cookieParser)
app.use(morgan)


module.exports= app