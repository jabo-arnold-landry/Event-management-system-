const asynHandler = require("express-async-handler");
const { Event, User } = require("../model/schamas");

//getting all events
const allEvents = asynHandler(async (req, res) => {
  if (Event.length !== 0) {
    const events = await Event.find();
    res.status(200).json({ message: events });
  } else {
    res.status(200).json({ message: "no event availiable" });
  }
});

//getting single event
const getEvent = asynHandler(async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  if (event) {
    return res.status(200).json({ message: event });
  } else {
    return res.status(404).json({ message: "the event not found" });
  }
});

//creating an event
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
  // updating the user's collection the (event field relationship)
  await User.findByIdAndUpdate(
    userId,
    { $push: { event: event._id } },
    { new: true }
  );
  if (event) {
    res.status(200).json({ message: "the event created successfuly" });
  }
});

//upadating the event status
const eventStatusUpdate = asynHandler(async (req, res) => {
  const eventId = req.params.eventId;

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

//event updating function
const updateEvent = asynHandler(async (req, res) => {
  const eventId = req.params.id;
  const { eventLocation, eventDate, eventEndTime } = req.body;
  const upadateEvent = await Event.updateMany(
    eventId,
    { $set: [{ eventLocation, eventDate, eventEndTime }] },
    { new: true, runValidators: true }
  );
  res.status(200).json({ message: "the event updated successfuly" });
  if (!updateEvent || ![eventLocation, eventDate, eventEndTime]) {
    res.status(400).json({ message: "unable to update the event " });
  }
});
//deleting an event
const deleteEvent = asynHandler(async (req, res) => {
  const eventId = req.params.id;
  const deleteEvent = await Event.findByIdAndDelete(eventId);
  if (deleteEvent) {
    res
      .status(200)
      .json({ message: `deleted ${deleteEvent.eventName}successfuly` });
  } else {
    res
      .status(400)
      .json({ message: "unable to delete the event double check the id" });
  }
});

module.exports = {
  allEvents,
  getEvent,
  createEvent,
  eventStatusUpdate,
  updateEvent,
  deleteEvent,
};
