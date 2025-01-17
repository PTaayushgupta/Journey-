const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require('../models/listing.js')

const MONGO_URL = "mongodb://127.0.0.1:27017/lustWander"
async function main(){
    await mongoose.connect(MONGO_URL)
}

main().then((res)=>{
    console.log("database connected")
})
.catch((e)=>{
    console.log("error",e)
})


const initDb = async ()=>{

    await Listing.deleteMany({})
    initData.data= initData.data.map((obj)=>({...obj, owner:'67891069e7e8f5f778910acd'}))
    await Listing.insertMany(initData.data)
    console.log("data was initialized")
};
initDb()