import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img : {
      type: String,
    },
    city : {
      type: String,
      required: true,
    },
    paymentId : {
      type: String,
    },
    paymentTime : {
      type: Date,
    },
    phone : {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, isAdmin: UserSchema.isAdmin },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

mongoose.models = {};
export default mongoose.model("Users", UserSchema);
