import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "logged out the user",
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userCheck = await User.findOne({ email });
  if (userCheck) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "get user",
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "update user",
  });
});

export {
  authUser,
  logOutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};