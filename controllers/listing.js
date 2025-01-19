const Listing = require("../models/listing")


module.exports.index= async (req,res)=>{
    const allListing = await Listing.find({})
    res.render("./listings/index.ejs", {allListing})
}
    


module.exports.renderNewForm = async(req,res)=>{
    
    res.render("./listings/new.ejs")
    
}

module.exports.showListings = async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner")
    if(!listing){
    req.flash("error","Requested listing does not exist!")
    res.redirect("/listings")

    }
    res.render("./listings/show.ejs",{listing})

}

module.exports.createListings = async (req,res)=>{
   
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing")
    }
    req.body.listing.url = req.body.listing.image;
    let newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    await newListing.save()
    req.flash("success","New listing created!")
    res.redirect("./listings")
}

module.exports.renderEditForm =  async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    if(!listing){
        req.flash("error","Requested listing does not exist!")
        res.redirect("/listings")
    
        }
    res.render("./listings/edit.ejs",{listing})

}

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params
    req.body.listing.url = req.body.listing.image;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","Data updated!")

    res.redirect("/listings")
}


module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params
    let deletedValue = await Listing.findByIdAndDelete(id)
    console.log(deletedValue)
    req.flash("success","Listing Deleted!")
    res.redirect("/listings")

}