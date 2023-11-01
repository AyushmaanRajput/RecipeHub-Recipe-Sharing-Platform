const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema({
  token: String,
});

const BlackList = mongoose.model("BlackList", blackListSchema);

module.exports =  BlackList ;
