const jwt = require("jsonwebtoken");
const BlackList = require("../models/Blacklist.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const blacklistedToken = await BlackList.findOne({ token: token });
    if (blacklistedToken) {
      return res.status(440).json({ message: "Session Expired, Login Again" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (decoded) {
        console.log(decoded, "");
        // req.body.userId = decoded.userId;
        req.userId = decoded.userId;
        next();
      } else {
        return res.status(400).json({ message: "Unauthorized" });
      }
    });
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
