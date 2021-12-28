const express = require("express");
const {
  createNewReservations,
  getReservationsBySellerId,
  updateReservationtById,
  deleteReservation,
  getApprovedReservations,
} = require("../controllers/reservations");
const { authentication } = require("../middlewares/authentication");

const reservationRouter = express.Router();

reservationRouter.post("/", authentication, createNewReservations);
reservationRouter.get("/", authentication, getReservationsBySellerId);
reservationRouter.get("/approve", authentication, getApprovedReservations);
reservationRouter.put("/:id", updateReservationtById);
reservationRouter.delete("/:id", deleteReservation);
module.exports = reservationRouter;
