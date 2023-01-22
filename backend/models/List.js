import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
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
    bedRoom: {
      type: Number,
      required: true,
    },
    bathRoom: {
      type: Number,
      required: true,
    },
    balcony: {
      type: Number,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    plotArea: {
      type: String,
      required: true,
    },
    furnishing: {
      type: String,
      required: true,
    },
    facing: {
      type: String,
      required: true,
    },
    isPlayGround: {
      type: Boolean,
      default: false,
    },
    isCarParking: {
      type: Boolean,
      default: false,
    },
    isCurrentAndWater: {
      type: Boolean,
      default: false,
    },
    isGarden: {
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

mongoose.models = {};

export default mongoose.model("Lists", ListSchema);
