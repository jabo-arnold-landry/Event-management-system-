const express = require("express");
const routes = express.Router();
const {
  allEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsControllers");
const authenticatedUser = require("../middlewares/protectingRoutes");
routes
  .route("/")
  .get(authenticatedUser, allEvents)
  .post(authenticatedUser, createEvent);

routes.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = routes;
