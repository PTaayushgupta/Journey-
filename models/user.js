const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new Schema({
    email:{
        type: String,
        required: true
    }
})

// passport create username and password field with salting and hashing in schema, hence we dont need to define these field by own //

userSchema.plugin(passportLocalMongoose)

User = mongoose.model("User",userSchema)
module.exports= User