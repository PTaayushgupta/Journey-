const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const wrapasync = require("../utils/wrapasync.js")
const passport = require("passport")
const { saveRedirectUrl } = require("../middleware.js")

const userController = require("../controllers/user.js")

router.get("/signup",userController.renderSignupForm)

router.post("/Signup",wrapasync(userController.Signup)
)


router.get("/login", userController.renderLoginForm )

router.post("/Login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}), userController.login)

router.get("/logout",userController.logout)


module.exports = router