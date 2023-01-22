import express from "express";
import {
  checkout,
  deletePayment,
  getPaymentNumbers,
  getPayments,
  paymentStats,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", paymentVerification);
router.get("/", getPayments);
router.get("/paymentstats", paymentStats);
router.get("/getpaymentnumbers", getPaymentNumbers);
router.delete("/:id", deletePayment);

export default router;
