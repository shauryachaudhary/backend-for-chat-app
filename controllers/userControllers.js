const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../jwt/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  
  
  

  if (!name || !email || !password || !avatar) {
    res.status(400);
    throw new Error("All Fields are required!");
  }
  const userExists = await User.find({ email });

  if (userExists) {
    res.status(400);
    throw new Error("You are already Registered!");
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User couldn't be created!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log("did you call me");
  const { email, password } = req.body;
  console.log(req.body);


  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are required!");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
