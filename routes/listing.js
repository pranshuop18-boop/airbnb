const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");



//this is for index listing route 
router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings });
    }),
);


//NEW ROUTE
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new");
});

//this is for SHOW ROUTE
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews",
                populate: {
                    path : "author",
                },
            })
            .populate("owner");
        if (!listing) {
            req.flash("error", "listing you request is unavailable");
            res.redirect("/listings");
        }
        console.log(listing);
        res.render("listings/show", { listing });
    }),
);


//CREATE ROUTE 
router.post(
    "/", isLoggedIn, validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        console.log(req.user);
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "New Listings Created");
        res.redirect("/listings");
    }),
);



//EDIT ROUTE 
router.get(
    "/:id/edit", isLoggedIn, isOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "listing you trying to edit is unavailable");
            res.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
    }),
);


//UPDATE ROUTE
router.put(
    "/:id", isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, ...req.body.listing, { runValidators: true });
        req.flash("success", "Listing Updated");
        res.redirect(`/listings/${id}`);
    }),
);

//DELETE ROUTE
router.delete(
    "/:id", isLoggedIn, isOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listings Deleted");
        res.redirect("/listings");
    }),
);


module.exports = router;