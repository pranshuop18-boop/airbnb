const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

passport.use(User.createStrategy());

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", wrapAsync(async(req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/login");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/listings");
    }
}));

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome , You logged in to WanderLust");
        res.redirect("/listings");
    });

router.get("/logout", (req, res) => {
    req.logout((Err) => {
        if (Err) {
            next(Err);
        }
        req.flash("error", "you are logger out");
        res.redirect("/listings");
    })
})

module.exports = router;