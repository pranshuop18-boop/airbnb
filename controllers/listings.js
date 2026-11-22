const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "listing you request is unavailable");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
};



module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    if (req.file) {
        newListing.image = {
            filename: req.file.filename,
            url: req.file.path,
        };
    }
    newListing.owner = req.user._id;
    await newListing.save();
    console.log(req.file);
    req.flash("success", "New Listings Created");
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "listing you trying to edit is unavailable");
        res.redirect("/listings");
    }

    let originalImageUrl =listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300/w_150");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const updateData = { ...req.body.listing };
    if (req.file) {
        updateData.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }
    await Listing.findByIdAndUpdate(id, updateData, { runValidators: true });

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listings Deleted");
    res.redirect("/listings");
};
