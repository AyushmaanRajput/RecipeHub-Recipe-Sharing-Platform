const User = require("../models/User.model");

exports.getSingleUser = async (req, res, next) => {};

exports.getLoggedInUser = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.body.userId;
  const { id } = req.params;
  console.log("userID", userId, "Id", id);
  try {
    const user = await User.findOne({ _id: userId });
    console.log(user)
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res, next) => {};
