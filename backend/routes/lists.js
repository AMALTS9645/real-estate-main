import express from "express";
import List from "../models/List.js";
import user from "../models/user.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//ADD Property

router.post("/", async (req, res, next) => {
  const newList = new List(req.body);

  try {
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (error) {
    next(error);
  }
});

//update

router.put("/:id", async (req, res, next) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (error) {
    next(error);
  }
});

// Update List for user
router.put("/update/:id", async (req, res) => {
  try {
    const post = await List.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        const updatedList = await List.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedList);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your List!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", async (req, res, next) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted");
  } catch (error) {
    next(error);
  }
});

// Delete List for user
router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await List.findById(req.params.id);
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

//GET specific list

router.get("/find/:id", async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

//GET ALL LIST
router.get("/", async (req, res, next) => {
  const { city, min, max, plot, ...others } = req.query;

  try {
    if (city || min || max || plot) {
      const lists = await List.find({
        ...others,
        city: { $regex: city, $options: "i" },
        price: { $gt: min | 1, $lt: max || 999 },
        plotArea: { $regex: plot },
      });

      res.status(200).json(lists);
    } else {
      const list = await List.find({});
      res.status(200).json(list);
    }
  } catch (err) {
    next(err);
  }
});

//Get featuredproperty
router.get("/feature", async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const lists = await List.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(lists);
  } catch (err) {
    next(err);
  }
});

//Get By city names
router.get("/countByCity", async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return List.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

//Get by type
router.get("/countByType", async (req, res, next) => {
  try {
    const listCount = await List.countDocuments({});
    res.status(200).json(listCount);
  } catch (error) {
    next(error);
  }
});

//Get by query
router.get("/find", async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const lists = await List.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(lists);
  } catch (err) {
    next(err);
  }
});

//Get last 5 house
router.get("/findlatest", async (req, res) => {
  const query = req.query.new;
  try {
    const lists = query
      ? await List.find().sort({ _id: -1 }).limit(5)
      : await List.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
