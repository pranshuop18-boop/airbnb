const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { insertMany } = require("../models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";


async function main() {

    await mongoose.connect(MONGO_URL);
};



const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6afbcb2359d2b12518f1aa8b" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
main()
    .then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.log(err);
    });