const express = require("express")
const router = express.Router({mergeParams:true})
const Listing = require("../models/listing.js")

const wrapAsync = require("../utils/wrapasync.js")

const Review = require("../models/review.js")
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")






// review


// Reviews 
//post review route
router.post("/",validateReview,
    isLoggedIn,
    wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)
     newReview.author = req.user._id
    listing.reviews.push(newReview)

    await newReview.save();
    await listing.save();
    req.flash("success","New Review created!")


    res.redirect(`/listings/${listing._id}`)
})
)

// Delete review route

router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(async(req,res)=>{
    let {id,reviewId}= req.params

    await Listing.findByIdAndUpdate(id,{$pull:{reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success"," Review Deleted!")


    res.redirect(`/listings/${id}`)
}))



module.exports= router;