const asynHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/schamas");

const createUser = asynHandler(async (req, res) => {
  const { names, email, password } = req.body;
  if (!names || !email || !password) {
    res.status(400);
    res.json({ message: "you need to pass in these field to continue" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ names, email, password: hashedPassword });
  if (user) {
    res.status(201);
    res.json({ message: `successfully created ${user.names}` });
  }
});

const logUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: `fill in the fields to continue` });
  if (email && password) {
    //finding a user in the database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // token creation
      const token = jwt.sign(
        {
          user: {
            id: user._id,
            names: user.names,
            email: user.email,
            role: user.roles,
          },
        },
        process.env.SECRET_WORD,
        { expiresIn: "1h" }
      );
      res.status(200);
      return res.json({ message: `logged in as ${user.names}`, token });
    }
    res.status(401);
    return res.json({ message: "incorrect email or password" });
  }
});

module.exports = { createUser, logUser };
