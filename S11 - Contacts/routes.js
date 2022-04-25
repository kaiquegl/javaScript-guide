const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const accessController = require("./src/controllers/accessController");

// Rotas da home
route.get("/", homeController.index);

// Rotas de login
route.get("/access/index", accessController.index);
route.post("/access/register", accessController.register);

module.exports = route;
