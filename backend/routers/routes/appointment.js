const express = require("express");
const {
  createNewAppointment,
  getAllAppointment,
  updateAppointmentById,
  deleteAppointmentById,
  getAppointmentsBysellerName,
  getAnAppointmentById,
  getAllAppointmentBySellerId,
} = require("../controllers/appointment");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const appointmentRouter = express.Router();

appointmentRouter.post(
  "/",
  authentication,
  authorization(1),
  createNewAppointment
);
appointmentRouter.get("/", authentication, getAllAppointment);
appointmentRouter.put("/:id", updateAppointmentById);
appointmentRouter.get("/:id", getAnAppointmentById);
appointmentRouter.delete("/:id", deleteAppointmentById);
appointmentRouter.get("/search", getAppointmentsBysellerName);
appointmentRouter.get("/seller/:id", getAllAppointmentBySellerId);
module.exports = appointmentRouter;
