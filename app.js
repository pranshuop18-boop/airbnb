const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../airbnb/models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js"); 
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main()
    .then(() => {
        console.log("Connected to DATABASES");
    }).catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});

//thia is for listing
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

//this is for show route 
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}));

app.post("/listings", wrapAsync(async (req, res, next) => {
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
}));

app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

app.put("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

app.post("/listings/:id/reviews", async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("Review saved in DB");
    res.send("new review saved");
});

app.all("*splat", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message } = err;
    res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Server is listening on 8080 port");
});