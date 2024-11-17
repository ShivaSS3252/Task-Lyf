const User = require("../models/userModel");
const createError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Register User
exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError("User already exists!", 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    //JWT(json web token) to user

    const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
      expiresIn: "90d",
    });
    res.status(201).json({
      status: "Success",
      message: "User Registered Successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {}
};

//Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new createError("User Not Found", 404));
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError("Invalid email or Password", 401));
    }
    const token = jwt.sign({ _id: user._id }, "secretkey123", {
      expiresIn: "90d",
    });
    res.status(200).json({
      status: "success",
      token,
      message: "Logged In Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
