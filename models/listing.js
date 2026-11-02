const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ys4KN0z1WZ17Mk2SnQh8vqvAa1KVWGA-0ABe027Fnw&s=10",
        },
    },

    price: {
        type: Number,
        required: true
    },
    location: String,
    country: String,
    reviews : [
        {
            type : Schema.Types.ObjectId
        }
    ]
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
