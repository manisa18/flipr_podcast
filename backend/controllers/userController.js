const User = require("../models/userModel");
const Podcast = require("../models/podcastModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        month: req.body.month,
        date: req.body.date,
        year: req.body.year,
      };
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: newUser,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ success: true, updateUser });
    } catch (err) {
      next(err);
    }
  } else {
    return next(new ErrorHander("You can update only your account!", 403));
  }
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ success: true, deleteUser });
    } catch (err) {
      next(err);
    }
  } else {
    return next(new ErrorHander("You can delete only your account!", 403));
  }
});
