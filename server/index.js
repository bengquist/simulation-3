const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
require("dotenv").config();
const ctrl = require("./controller");
const session = require("express-session");

const port = process.env.PORT || 3001;

const app = express();

app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000000
    }
  })
);

massive(process.env.CONNECTION_STRING).then(db => app.set("db", db));

app.post("/api/user/register", ctrl.addUser);
app.post("/api/user/login", ctrl.getUser);
app.get("/api/posts/:userID/:userposts", ctrl.getPosts);
app.get("/api/post/:postID", ctrl.getSinglePost);
app.post("/api/post/:userID", ctrl.submitPost);

app.listen(port, () => console.log(`listening @ ${port}`));
