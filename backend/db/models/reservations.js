const mongoose = require("mongoose");

// status 0 refer to that the reservations is not approved and status 1 approved
const reservationsSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  status: { type: Number, default: 0 },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Reservations", reservationsSchema);
