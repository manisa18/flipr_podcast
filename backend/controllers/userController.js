const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, gender, month, date, year } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    gender,
    month,
    date,
    year,
    avatar: {
      public_id: "this is a sample id",
      url: "profilephoto",
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.googleAuth = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      sendToken(user, 200, res);
    } else {
      const newUser = new User({
        ...req.body,
        avatar: {
          public_id: "this is a sample id",
          url: "profilephoto",
        },
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      sendToken(savedUser, 200, res);
    }
  } catch (err) {
    next(err);
  }
});
