const mongoose = require("mongoose");

// status 1 refer to that the appointment is available and status 0 not available
const appointmentSchema = new mongoose.Schema({
  date: { type: Date },
  status: { type: Number, default: 1 },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
