const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// role 2 refer to that the user is buyer and status 1  refer to that the user is seller
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: Number },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: Number, default: 2 },
});

// this function to hashing password before save in database
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
