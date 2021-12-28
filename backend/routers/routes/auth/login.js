const express = require("express");
const { Login } = require("../../controllers/auth/login");

const loginRouter = express.Router();
loginRouter.post("/", Login);

module.exports = loginRouter;
