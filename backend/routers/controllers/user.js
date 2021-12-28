const userSchema = require("../../db/models/user");

const getAllSeller = (req, res) => {
  userSchema
    .find({ role: 1 })
    .then((seller) => {
      res.status(200).json({
        success: true,
        message: `All Seller`,
        seller: seller,
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
  getAllSeller,
};
