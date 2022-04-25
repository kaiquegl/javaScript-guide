const express = require("express");
const route = express.Router();

const home = require("./src/controllers/home");

// Home
route.get("/", home.homePage);;
route.post("/", home.formHandler);

module.exports = route;
