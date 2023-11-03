const User = require("../models/User.model");

exports.getSingleUser = async (req, res, next) => {};

exports.getLoggedInUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Couldn't Fetch User" });
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
    // const user = await User.findOne({ _id: userId });
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res, next) => {};
