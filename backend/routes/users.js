import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Token from "../models/token.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import {
  deleteUser,
  getUser,
  getUserNumbers,
  getUsers,
  register,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { join } from "path";

const Validate = (data) => {
  const valSchema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    country: Joi.string().required().label("Country"),
    city: Joi.string().required().label("City"),
    img:Joi.string().label("Image"),
    phone: Joi.required().label("Phone"),
    password: passwordComplexity().required().label("Password"),
  });
  return valSchema.validate(data);
};

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = Validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ messege: "Invalid Link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "invalid Link" });

    await User.updateOne({ _id: user._id }, { verified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified seccessfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server Error" });
  }
});

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete the account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello Admin, you are logged in and you can delete all accounts");
// });



//UPDATE USER
router.put("/:id", updateUser);

//DELETE USER
router.delete("/:id", deleteUser);

//GET USER
router.get("/:id", getUser);

//GET ALL USERS
router.get("/",  getUsers);

//GET Users Count
router.get("/count/numbers",  getUserNumbers);

//Admin reg
router.post("/register", register)

export default router;
