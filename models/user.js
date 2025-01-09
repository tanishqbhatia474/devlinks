const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  twitter: { type: String, required: false },
  github: { type: String, required: false },
  youtube: { type: String, required: false },
  instagram: { type: String, required: false },
  linkedin: { type: String, required: false },
  stackoverflow: { type: String, required: false },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;