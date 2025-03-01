const mongoose = require("mongoose");

const dbConn = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `MongoDB connected: ${connection.connection.host} , on db : ${connection.connection.name}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConn;
