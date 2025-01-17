const express = require("express")
const router = express.Router()
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js")
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js")
const listingControllers = require("../controllers/listing.js")



router
.route("/")
.get( wrapAsync(listingControllers.index)) // index route
.post(
    validateListing,
    wrapAsync(listingControllers.createListings)  //create listing route
)

// NEW ROUTE 

router.get("/new",isLoggedIn,listingControllers.renderNewForm)  // render create form

router
.route("/:id")
.get( wrapAsync(listingControllers.showListings)  // show listing items
)
.put(
    isLoggedIn,
    isOwner,
    validateListing,
     wrapAsync(listingControllers.updateListing) // update listing items 
).delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.deleteListing)  // delete listing items 
)

// Edit route

router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.renderEditForm)
)


//Export file
module.exports = router