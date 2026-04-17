const app = require("./src/app.js")
const dbConnection = require("./src/config/database.js")
require("dotenv").config()

const PORT= 3000

dbConnection()

app.listen(PORT, ()=>{
    console.log("server is started at port " + PORT)
})