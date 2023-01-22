import express, { json } from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();
//Post ticket
router.post("/", async (req, res) => {
  const newTicket = new Ticket(req.body);
  try {
    const savedTicket = await newTicket.save();
    res.status(200).json(savedTicket);
  } catch (error) {
    res.status(500).json(error);
  }
});
//tickets of particular user
router.get("/user/:id", async (req, res) => {
  try {
    const tickets = await Ticket.find({ clientId: req.params.id });
    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
});
//GET all tickets
router.get("/all", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
});

//GET individual tickets
router.get("/all/:id", async (req, res) => {
  try {
    const tickets = await Ticket.findById(req.params.id);
    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
});
//UPDATE ticket
router.put("/:id", async (req, res, next) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        status: "Pending operator response",
        msgAt: new Date(),
        $push: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTicket);
  } catch (error) {
    next(error);
  }
});
//UPDATE ticket admin
router.put("/reply/:id", async (req, res, next) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        status: "Operator responded",
        msgAt: new Date(),
        $push: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTicket);
  } catch (error) {
    next(error);
  }
});
//UPDATE status
router.put("/status/:id", async (req, res, next) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTicket);
  } catch (error) {
    next(error);
  }
});
//DELETE ticket
router.delete("/:id", async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json("Ticket has been deleted.");
  } catch (err) {
    next(err);
  }
});

//pending ticket count
router.get("/countByType/:id", async (req, res, next) => {
  try {
    const listCount = await Ticket.countDocuments({
      clientId: req.params.id,
      status: "Pending operator response",
    });
    res.status(200).json(listCount);
  } catch (error) {
    next(error);
  }
});
//ticket count
router.get("/countByType/no/:id", async (req, res, next) => {
  try {
    const listCount = await Ticket.countDocuments({
      clientId: req.params.id,
    });
    res.status(200).json(listCount);
  } catch (error) {
    next(error);
  }
});

export default router;
