const appointmentSchema = require("../../db/models/appointment");

const userSchema = require("../../db/models/user");

////////////////
//this function creat new Appointment by take the info from the req from body and userId from token then it return the new one
const createNewAppointment = (req, res) => {
  const { date, status, description } = req.body;
  const sellerId = req.token.userId;
  const newAppointment = new appointmentSchema({
    date,
    status,
    sellerId,
    description,
  });

  newAppointment
    .save()
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: "Success new Appointment Added",
        appointment: result,
      });
      return;
    })
    .catch((err) => {
      res.status(500);
      res.json({ success: false, message: "server error" });
    });
};

// this function return all Appointment
const getAllAppointment = (req, res) => {
  const id = req.token.userId;
  appointmentSchema
    .find({ sellerId: id })
    .populate("sellerId", "firstName lastName -_id")
    .then((appointment) => {
      res.status(200).json({
        success: true,
        message: `All Appointment`,
        appointment: appointment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

// this function return all Appointment
const getAllAppointmentBySellerId = (req, res) => {
  const id = req.params.id;
  appointmentSchema
    .find({ sellerId: id })
    .populate("sellerId", "firstName lastName _id")
    .then((appointment) => {
      res.status(200).json({
        success: true,
        message: `All Appointment`,
        appointment: appointment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

const getAnAppointmentById = (req, res) => {
  const id = req.params.id;
  appointmentSchema
    .findById(id)
    .then((appointment) => {
      res.status(200).json({
        success: true,
        message: `All Appointment`,
        appointment: appointment,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function update Appointment by it's id
const updateAppointmentById = (req, res) => {
  const _id = req.params.id;

  appointmentSchema
    .findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Appointment => ${_id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: ` Success Appointment updated`,
        appointment: result,
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

//this function delete a specific Appointment using the id
const deleteAppointmentById = (req, res) => {
  const id = req.params.id;
  appointmentSchema
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Appointment => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Success Delete Appointment with id => ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        // err: err,
      });
    });
};

//this function get Appointments By sellerName return all his Appointments
const getAppointmentsBysellerName = async (req, res) => {
  let sellerName = req.query.sellerName;

  await userSchema
    .find({ firstName: sellerName, role: 1 })
    .exec()
    .then(async (result) => {
      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: `The sellerName => ${sellerName} not found`,
        });
      }
      await appointmentSchema
        .find({ sellerId: result[0]._id, status: 1 })
        .populate("sellerId", "firstName lastName -_id")
        .exec()
        .then((result) => {
          if (!result) {
            return res.status(404).json({
              success: false,
              message: `The sellerId not found`,
            });
          }
          res.status(200).json({
            success: true,
            message: `The sellerId ${result[0]._id} `,
            appointments: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
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
  createNewAppointment,
  getAllAppointment,
  updateAppointmentById,
  deleteAppointmentById,
  getAppointmentsBysellerName,
  getAnAppointmentById,
  getAllAppointmentBySellerId,
};
