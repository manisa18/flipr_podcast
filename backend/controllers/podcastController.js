const Podcast = require("../models/podcastModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createPodcast = catchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.create(req.body);
  res.status(201).json({
    success: true,
    podcast,
  });
});

exports.getAllPodcast = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;

  const podcastCount = await Podcast.countDocuments();
  const apiFeatures = new ApiFeatures(Podcast.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const podcasts = await apiFeatures.query;
  res.status(201).json({
    success: true,
    podcasts,
    podcastCount,
  });
});

exports.getPodcastDetails = catchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    return next(new ErrorHander("Podcast not found", 404));
  }

  res.status(200).json({
    success: true,
    podcast,
  });
});

exports.updatePodcast = catchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    return next(new ErrorHander("Podcast not found", 404));
  }
  const updatePodcast = await Podcast.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    updatePodcast,
  });
});

exports.deletePodcast = catchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    return next(new ErrorHander("Podcast not found", 404));
  }

  const deletePodcast = await Podcast.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    deletePodcast,
  });
});
