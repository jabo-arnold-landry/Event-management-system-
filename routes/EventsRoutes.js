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
const { attandeesCreation } = require("../controllers/attandance");
const authenticatedUser = require("../middlewares/protectingRoutes");
routes
  .route("/")
  .get(authenticatedUser, allEvents)
  .post(authenticatedUser, createEvent);

routes
  .route("/:id")
  .get(getEvent)
  .put(authenticatedUser, updateEvent)
  .delete(authenticatedUser, deleteEvent);
routes
  .route("/:eventId/attandees")
  .post(authenticatedUser, attandeesCreation)
  .delete(authenticatedUser, attandeesCreation);
routes.route("/:eventId/status").put(eventStatusUpdate);
module.exports = routes;
