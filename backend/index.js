import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay";
dotenv.config();

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import listsRoute from "./routes/lists.js";
import landsRoute from "./routes/lands.js";
import passwordResetRoutes from "./routes/passwordReset.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";
import paymentRoute from "./routes/payment.js";
import ticketRoute from "./routes/tickets.js";

//Database
import connectDB from "./connection.js";

//Razorpay
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/houses", listsRoute);
app.use("/api/lands", landsRoute);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/tickets", ticketRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//Razorpay key
app.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

const port = process.env.PORT || 8080;

// SERVER
app.listen(port, () => {
  connectDB();
  console.log(`connected to backend...Listening port ${port}`);
});
