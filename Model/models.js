const mongoose = require("mongoose");

const userSchema = require("../Schemas/User/userSchema");
const User = new mongoose.model("User", userSchema);

module.exports = User;
