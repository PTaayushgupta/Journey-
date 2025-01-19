const mongoose = require("mongoose");
const Review = require("./review.js")
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: String,
    url: {
        type: String,
        set : (v)=> (!v || v.trim() === "" ? "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?cs=srgb&dl=pexels-pixabay-38238.jpg&fm=jpg"
            : v),
        default:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?cs=srgb&dl=pexels-pixabay-38238.jpg&fm=jpg",
        
           
    },
    
    
    price: Number,
    location: String,
    country: String,
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"

    }
],
owner:{
    type: Schema.Types.ObjectId,
            ref: "User"
}

   
    

});

// middleware (post) for listing to delete review {mongoose middleware}

 listingSchema.post("findoneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}})
  }
})


const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing