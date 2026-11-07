const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hiii,im root!");
});

app.listen(3000, () => {
    console.log("server is running on port 3000")
});