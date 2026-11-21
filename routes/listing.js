const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");


//this is for index listing route 
//CREATE ROUTE 
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing,
        wrapAsync(listingController.createListing));


//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);


//this is for SHOW ROUTE
//DELETE ROUTE
//UPDATE ROUTE

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner,
        wrapAsync(listingController.destroyListing))

//EDIT ROUTE 
router.get(
    "/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.renderEditForm),
);


module.exports = router;