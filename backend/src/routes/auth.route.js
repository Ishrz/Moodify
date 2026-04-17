const { Router} = require("express")
const {registration , login} = require("../controllers/auth.controller")
const logger = require("../middlewares/logger.js")
const router = Router()



router.post("/registration" , logger , registration )

router.post("/login" ,logger, login)



module.exports = router