const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(data.id);

      if (!req.user) {
        return next(new ErrorHander("User not found"), 404);
      }
    }

    next();
  } catch (error) {
    return next(new ErrorHander("Invalid or expired token"), 401);
  }
});
