const express = require("express")
const router = express.Router()
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js")
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js")


// listing



// INDEX ROUTE
router.get("/", async (req,res)=>{
    const allListing = await Listing.find({})
    res.render("./listings/index.ejs", {allListing})
    
})

// NEW ROUTE 

router.get("/new",isLoggedIn,async(req,res)=>{
    
    res.render("./listings/new.ejs")
    
})

//SHOW ROUTE

router.get("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner")
    if(!listing){
    req.flash("error","Requested listing does not exist!")
    res.redirect("/listings")

    }
    res.render("./listings/show.ejs",{listing})

})
)

//CREATE ROUTE 

router.post("/",
    validateListing,
    wrapAsync( async (req,res)=>{
   
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing")
    }
    let newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    await newListing.save()
    req.flash("success","New listing created!")
    res.redirect("./listings")
})
)


// EDIT ROUTE 

router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync( async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    if(!listing){
        req.flash("error","Requested listing does not exist!")
        res.redirect("/listings")
    
        }
    res.render("./listings/edit.ejs",{listing})

})
)

//UPDATE ROUTE 

router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
     wrapAsync(async (req,res)=>{
    let {id} = req.params
    
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","Data updated!")

    res.redirect("/listings")
})
)


//DELETE ROUTE 


router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req,res)=>{
    let {id} = req.params
    let deletedValue = await Listing.findByIdAndDelete(id)
    console.log(deletedValue)
    req.flash("success","Listing Deleted!")
    res.redirect("/listings")

})
)

module.exports = router