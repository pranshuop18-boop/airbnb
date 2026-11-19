const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const { insertMany } = require("../models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";


async function main() {
    await mongoose.connect(MONGO_URL);
    try {
        await initDB();
        console.log("Connected to DB");
    } finally {
        await mongoose.disconnect();
    }
};



const initDB = async() => {
    const owner = await User.findOne().sort({ _id: -1 });
    if (!owner) {
        throw new Error("Create a user before initializing listings.");
    }

    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: owner._id,
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

main()
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    });
