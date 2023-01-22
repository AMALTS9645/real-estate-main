import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    isPaid: Boolean,
    amount: { type: Number },
    orderId: String,
    paymentId: String,
    signature: String,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
