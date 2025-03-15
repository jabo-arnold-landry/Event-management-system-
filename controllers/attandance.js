const asynHandler = require("express-async-handler");
const { Event, User, Attendance } = require("../model/schamas");

const attandeesCreation = asynHandler(async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;
  const eventId = req.params.eventId;
  if (name !== null && email !== null) {
    const attendee = await Attendance.create({
      name,
      email,
      event: eventId,
      user: userId,
    });
    await User.findByIdAndUpdate(userId, {
      $push: { particpants: attendee._id },
    });

    await Event.findByIdAndUpdate(eventId, {
      $push: { attandees: attendee._id },
    });
  }
});

module.exports = { attandeesCreation };
