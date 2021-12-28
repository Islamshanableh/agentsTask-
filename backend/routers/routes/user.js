const express = require("express");
const { getAllSeller } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/", getAllSeller);

module.exports = userRouter;
