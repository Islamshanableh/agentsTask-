const express = require("express");
const app = express();
const cors = require("cors")
const connection = require("./db/db");

app.use(express.json());

app.use(cors());

const signUpRouter = require("./routers/routes/auth/signUp")
const loginRouter = require ("./routers/routes/auth/login")
const appointmentRouter = require ("./routers/routes/appointment")
const reservationRouter = require ("./routers/routes/reservations")
const userRouter = require ("./routers/routes/user")

app.use("/signUp",signUpRouter)
app.use("/login",loginRouter)
app.use("/appointment",appointmentRouter)
app.use("/reservation",reservationRouter)
app.use("/users",userRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
