const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  image: { type: String },
  twitter: { type: String },
  github: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  stackoverflow: { type: String },
  // Add more social links as needed
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;