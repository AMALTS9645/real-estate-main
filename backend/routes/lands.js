import express from "express";
import Land from "../models/Land.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//ADD Land

router.post("/", async (req, res, next) => {
  const newLand = new Land(req.body);

  try {
    const savedLand = await newLand.save();
    res.status(200).json(savedLand);
  } catch (error) {
    next(error);
  }
});

//update Land

router.put("/:id", async (req, res, next) => {
  try {
    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLand);
  } catch (error) {
    next(error);
  }
});

// Update Land for user
router.put("/update/:id", async (req, res) => {
  try {
    const post = await Land.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        const updatedLand = await Land.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedLand);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Land

router.delete("/:id", async (req, res, next) => {
  try {
    await Land.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted");
  } catch (error) {
    next(error);
  }
});

// Delete Land for user
router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await Land.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET specific Land

router.get("/find/:id", async (req, res, next) => {
  try {
    const land = await Land.findById(req.params.id);
    res.status(200).json(land);
  } catch (error) {
    next(error);
  }
});

//GET ALL LANDS
router.get("/", async (req, res, next) => {
  const { city, min, max, plot, ...others } = req.query;

  try {
    if (city || min || max || plot) {
      const lists = await Land.find({
        ...others,
        city: { $regex: city || "", $options: "i" },
        price: { $gt: min | 1, $lt: max || 999 },
        plotArea: { $regex: plot },
      });
      res.status(200).json(lists);
    } else {
      const list = await Land.find({});
      res.status(200).json(list);
    }
  } catch (err) {
    next(err);
  }
});

//Get by type
router.get("/countByTypes", async (req, res, next) => {
  try {
    const landData = await Land.countDocuments({});
    res.status(200).json(landData);
  } catch (error) {
    next(error);
  }
});

//Get last 5 lands
router.get("/findlatest", async (req, res) => {
  const query = req.query.new;
  try {
    const lands = query
      ? await Land.find().sort({ _id: -1 }).limit(5)
      : await Land.find();
    res.status(200).json(lands);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
