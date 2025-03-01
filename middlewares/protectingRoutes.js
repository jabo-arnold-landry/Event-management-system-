const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;
  //checking for presence of authorization in the header and the presence of Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // getting the token from the header by spliting the Bearer with the jwt
      token = req.headers.authorization.split(" ")[1];
      //checking if the token matches the one assigned to a user when logging in
      const decodedUserInfo = jwt.verify(token, process.env.SECRET_WORD);
      // assigninng the user object from decoded information to req.user
      req.user = decodedUserInfo.user;
      next();
    } catch (err) {
      console.log("Jwt key error", err);
      // error message when we have an invalid token
      res.status(401).json({ message: "invalid token" });
      return;
    }
  } else {
    // error message when we the user hasn't loged in or the token has expired
    res.status(401).json({
      message: "your token has expired try to login again please",
    });
    return;
  }
});

module.exports = authenticateUser;
