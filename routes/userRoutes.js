const express = require("express");
const routes = express.Router();
const { createUser, logUser } = require("../controllers/userController");

routes.route("/").post(createUser);
routes.route("/login").post(logUser);

module.exports = routes;
