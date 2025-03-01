const express = require("express");
const env = require("dotenv").config();
const dbConn = require("./config/dbconnection");
dbConn();
const app = express();
const port = process.env.PORT || 3000; // Port number
app.use(express.json()); //parse json data
app.use(express.urlencoded({ extended: true })); //parse urlencoded data
app.use("/event/api", require("./routes/EventsRoutes"));
app.use("/user/api", require("./routes/userRoutes"));
app.listen(port, () => {
  // Listen to port
  console.log(`Server is running on port ${port}`);
});
