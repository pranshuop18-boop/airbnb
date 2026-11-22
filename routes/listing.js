const express = require("express");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//this is for index listing route 
//CREATE ROUTE 
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing),
    );

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
        upload.single("listing[image]"),
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
