const express = require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js")
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(flash());
const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionOptions));

app.use((req, res,next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "sid" } = req.query;
    req.session.name = name;
    if (name === "sid") {
        req.flash("error", "user not registered");
    } else {
        req.flash("success", "user registered successfully");
    }
    res.redirect("/name");
});

app.get("/name", (req, res) => {

    res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
});

app.use("/users", users);
app.use("/posts", posts);



app.listen(3000, () => {
    console.log("server is running on port 3000")
});
