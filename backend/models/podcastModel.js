const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Podcast Name"],
    maxlength: [50, "Name cannot exceed 30 characters"],
    minlength: [3, "Name should have more than 3 characters"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Podcast Description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Category"],
    enum: ["Music", "Sports", "News", "Education", "Technology", "Other"],
  },
  views: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    required: [true, "Please Enter Type"],
    enum: ["audio", "video"],
  },
  speaker: {
    type: String,
    required: [true, "Please Enter Speaker Name"],
  },
  img: {
    type: String,
    // required: true,
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Podcast", podcastSchema);
