const { Router} = require("express")
const {registration , login , getMe, logOut} = require("../controllers/auth.controller")

//middlewares
const logger = require("../middlewares/logger.js")
const authUser = require("../middlewares/auth.middleware.js")

const router = Router()


////http://localhost:4000/api/v1/auth
router.post("/registration" , logger , registration )

router.post("/login" ,logger, login)

router.get("/get-me" ,  logger,authUser ,  getMe)

router.get("/logout" , logger, logOut)

module.exports = router