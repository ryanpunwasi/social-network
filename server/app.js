const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./config/db.config");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const tweetsRouter = require("./routes/tweets");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/register", registerRouter(db));
app.use("/login", loginRouter(db));
app.use("/tweets", tweetsRouter(db));

module.exports = app;
