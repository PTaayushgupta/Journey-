const express = require("express")
const router = express.Router({mergeParams:true})
const Listing = require("../models/listing.js")

const wrapAsync = require("../utils/wrapasync.js")

const Review = require("../models/review.js")
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")

const reviewController = require("../controllers/review.js")






// review


// Reviews 
//post review route
router.post("/",validateReview,
    isLoggedIn,
    wrapAsync(reviewController.createReview)
)

// Delete review route

router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview))



module.exports= router;