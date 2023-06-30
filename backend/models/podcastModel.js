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
  uploadedDate: {
    type: Date,
    default: Date.now,
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
    required: true,
  },
  file: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    // ref: "File",
    required: true,
  },
  followers: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    default: [],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  viewedBy: {
    type: [String],
    default: [],
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikesCount: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: [String],
    default: [],
  },
  files: {
    type: [mongoose.Schema.ObjectId],
    ref: "File",
    default: [],
  },
  episodes: {
    type: [mongoose.Schema.ObjectId],
    ref: "Episode",
    default: [],
  },
});

module.exports = mongoose.model("Podcast", podcastSchema);
