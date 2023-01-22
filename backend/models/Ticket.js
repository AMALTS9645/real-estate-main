import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    subject: {
      type: String,
      required: true,
      default: "",
    },
    openAt: {
      type: Date,
      required: true,
    },
    foundAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    status: {
      type: String,
      required: true,
      default: "Pending operator response",
    },
    details: {
      type: String,
      required: true,
      default: "",
    },

    conversations: [
      {
        sender: {
          type: String,
          required: true,
          default: "",
        },
        message: {
          type: String,
          required: true,
          default: "",
        },
        msgAt: {
          type: Date,
          required: true,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Tickets", TicketSchema);
