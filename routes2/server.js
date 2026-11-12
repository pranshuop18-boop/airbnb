const express = require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js")
const session =require("express-session");
app.use(session({secret :"mysecret"}));

app.use("/users", users);
app.use("/posts", posts);

app.get("/test",(req,res)=>{
    res.send("server");
});

app.listen(3000, () => {
    console.log("server is running on port 3000")
});
