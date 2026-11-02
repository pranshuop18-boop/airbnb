const mongoose = require("mongoose");
const Review = require("./models/review.js");

async function main() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/WanderLust"
        );

        const review = await Review.create({
            comment: "Amazing place to stay!",
            rating: 5
        });

        console.log("Review inserted:", review);

        const reviews = await Review.find({});
        console.log("All reviews:", reviews);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

main();