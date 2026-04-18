const { Router} = require("express")
const {registration , login , getMe, logOut} = require("../controllers/auth.controller")

//middlewares
const logger = require("../middlewares/logger.js")
const authUser = require("../middlewares/auth.middleware.js")

const router = Router()



router.post("/registration" , logger , registration )

router.post("/login" ,logger, login)

router.get("/get-me" ,  logger,authUser ,  getMe)

router.get("/logout" , logger, logOut)

module.exports = router