const reservationsSchema = require("../../db/models/reservations");
const mongoose = require("mongoose").Types.ObjectId;
////////////////
//this function create new Reservation by take the info from the req from body and buyerId from token then it return the new one
const createNewReservations = (req, res) => {
  const { appointment, sellerId } = req.body;
  const buyerId = req.token.userId;
  const newReservation = new reservationsSchema({
    appointment,
    sellerId,
    buyerId,
  });

  newReservation
    .save()
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: "Success new Reservations Added",
        appointment: result,
      });
      return;
    })
    .catch((err) => {
      res.status(500);
      res.json({ success: false, message: "server error" });
    });
};

//this function get Reservations by SellerId return all his Reservations
const getReservationsBySellerId = (req, res) => {
  let sellerId = req.token.userId;

  reservationsSchema
    .find({ sellerId: new mongoose(sellerId), status: 0 })
    .populate("buyerId", "firstName lastName -_id")
    .populate("appointment", "date")
    .then((reservations) => {
      if (!reservations.length) {
        return res.status(404).json({
          success: false,
          message: `The reservations => ${sellerId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the reservations for the SellerId => ${sellerId}`,
        reservations: reservations,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

const getApprovedReservations = (req, res) => {
  let sellerId = req.token.userId;

  reservationsSchema
    .find({ sellerId: new mongoose(sellerId), status: 1 })
    .populate("buyerId", "firstName lastName -_id")
    .populate("appointment", "date")
    .then((reservations) => {
      if (!reservations.length) {
        return res.status(404).json({
          success: false,
          message: `The reservations => ${sellerId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the reservations for the SellerId => ${sellerId}`,
        reservations: reservations,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

//this function update Reservation by it's id
const updateReservationtById = (req, res) => {
  const _id = req.params.id;

  reservationsSchema
    .findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Reservation => ${_id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: ` Success Reservation updated`,
        Reservation: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

const deleteReservation = (req, res) => {
  const id = req.params.id;

  reservationsSchema
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Reservation => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: ` Success Reservation deleted`,
        Reservation: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

module.exports = {
  createNewReservations,
  getReservationsBySellerId,
  updateReservationtById,
  deleteReservation,
  getApprovedReservations,
};
