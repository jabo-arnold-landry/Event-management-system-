const asynHandler = require("express-async-handler");

const allEvents = asynHandler(async (req, res) => {
  res.json({ message: "welcome to the events api" });
});

const getEvent = asynHandler(async (req, res) => {
  res.json({ message: "get a single event" });
});

const createEvent = asynHandler(async (req, res) => {
  res.json({ message: "create an event" });
});

const updateEvent = asynHandler(async (req, res) => {
  res.json({ message: "update an event" });
});

const deleteEvent = asynHandler(async (req, res) => {
  res.json({ message: "delete an event" });
});
module.exports = { allEvents, getEvent, createEvent, updateEvent, deleteEvent };
