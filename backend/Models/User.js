// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  answeredDailyQuestion: { type: Boolean, default: false },
  stars: { type: Number, default: 0 },
  lastAnswerSubmitted: { type: Date,},
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
