if(process.env.NODE_ENV !="production"){
    require("dotenv").config()
}
const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require('../models/listing.js')

// const MONGO_URL = "mongodb://127.0.0.1:27017/lustWander"
const dbUrl = process.env.ATLASDB_URL
async function main(){
    await mongoose.connect(dbUrl)
}

main().then((res)=>{
    console.log("database connected")
})
.catch((e)=>{
    console.log("error",e)
})


const initDb = async ()=>{

    await Listing.deleteMany({})
    initData.data= initData.data.map((obj)=>({...obj, owner:'678c1b9b1a8febf11191fe54'}))
    await Listing.insertMany(initData.data)
    console.log("data was initialized")
};
initDb()