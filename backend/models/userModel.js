const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    minlength: [3, "Name should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password should have at least 8 characters"],
    select: false,
  },
  gender: {
    type: String,
    required: [true, "Please Enter Your Gender"],
    enum: ["male", "female", "non-binary"],
  },
  dob: {
    type: Date,
    required: [true, "Please Enter Your Date of Birth"],
  },
  roles: {
    type: String,
    default: "user",
  },
  likedPodcast: {
    type: [String],
    default: [],
  },
  dislikedPodcast: {
    type: [String],
    default: [],
  },
  savedPlaylist: {
    type: [String],
    default: [],
  },
  playlist: {
    type: [String],
    default: [],
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  fromGoogle: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
