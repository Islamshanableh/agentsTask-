const userModel = require("../../../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userModel
    .findOne({ email })
    .then(async (result) => {
      if (!result) {
        return res.json({
          success: false,
          message: "The email doesn't exist",
        });
      }
      try {
        const check = bcrypt.compareSync(password, result.password);
        if (!check) {
          res.json({
            success: false,
            message: "The password you’ve entered is incorrect",
          });
        }
        const payload = {
          userId: result._id,
          firstName: result.firstName,
          role: result.role,
        };
        const options = {
          expiresIn: "100h",
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);

        res.status(200).json({
          success: true,
          message: `Email and Password are correct`,
          token: token,
          role: result.role,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

module.exports = { Login };
