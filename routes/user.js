const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const wrapasync = require("../utils/wrapasync.js")
const passport = require("passport")
const { saveRedirectUrl } = require("../middleware.js")

router.get("/signup",(req,res)=>{
    res.render("./users/singnup.ejs")

})

router.post("/Signup",wrapasync(async(req,res)=>{
    try{
        let {username,email,password}= req.body
    const newUser = new User({email,username})

  const registeredUser = await User.register(newUser,password)
  console.log(registeredUser)
  req.login(registeredUser,(err)=>{
    if(err){
        return next(err)
    }
    req.flash("success", "Welcome to Journey")
    res.redirect("/listings")

  })
  
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }

})
)
// login route 


router.get("/login", (req,res)=>{
    res.render("./users/login.ejs")
} )

router.post("/Login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}), async(req,res)=>{
    req.flash("success","Welcome to Journey(your Travel partner )")
    let redirectUrl = res.locals.redirectUrl || "listings";
    res.redirect(redirectUrl)
})

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logged out")
        res.redirect("listings")
    })
})






module.exports = router