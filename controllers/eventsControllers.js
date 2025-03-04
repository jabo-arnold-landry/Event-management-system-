const asynHandler = require("express-async-handler");
const { Event, User } = require("../model/schamas");
const allEvents = asynHandler(async (req, res) => {
  res.json({ message: "welcome to the events api" });
});

const getEvent = asynHandler(async (req, res) => {
  res.json({ message: "get a single event" });
});

const createEvent = asynHandler(async (req, res) => {
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    eventEndTime,
  } = req.body;
  const userId = req.user.id;
  const event = await Event.create({
    eventName,
    eventDescription,
    eventLocation,
    eventDate: new Date(eventDate),
    eventEndTime: new Date(eventEndTime),
    eventOwner: userId,
  });
  // updating the user's collection the event field
  await User.findByIdAndUpdate(
    userId,
    { $push: { event: event._id } },
    { new: true }
  );
  if (event) {
    res.status(200).json({ message: "the event created successfuly" });
  }
});
const eventStatusUpdate = asynHandler(async (req, res) => {
  const eventId = req.params.id;
  const { eventStatus } = req.body;
  if (!["completed", "cancelled", "active", "pending"].includes(eventStatus)) {
    res.status(400);
    return res.json({ message: "invalid input status" });
  }
  const event = await Event.findByIdAndUpdate(
    eventId,
    { eventStatus },
    { new: true, runValidators: true }
  );
  res.status(200).json({ message: "the event status upadated" });
  // if (!event) {
  //   return res.status(404).json({ message: "event not found" });
  // }
});
const updateEvent = asynHandler(async (req, res) => {
  res.json({ message: "update an event" });
});

const deleteEvent = asynHandler(async (req, res) => {
  res.json({ message: "delete an event" });
});
module.exports = {
  allEvents,
  getEvent,
  createEvent,
  eventStatusUpdate,
  updateEvent,
  deleteEvent,
};
