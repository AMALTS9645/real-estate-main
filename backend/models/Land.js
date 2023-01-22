import mongoose from "mongoose";

const LandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    listedBy: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    plotArea: {
      type: String,
      required: true,
    },
    facing: {
      type: String,
      required: true,
    },
    isCurrentAndWater: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lands", LandSchema);
