const express = require("express");
const routes = express.Router();
const {
  allEvents,
  getEvent,
  createEvent,
  eventStatusUpdate,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsControllers");
const authenticatedUser = require("../middlewares/protectingRoutes");
routes
  .route("/")
  .get(authenticatedUser, allEvents)
  .post(authenticatedUser, createEvent);

routes.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);
routes.route("/:eventId/status").put(eventStatusUpdate);
module.exports = routes;
