const Podcast = require("../models/podcastModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createPodcast = catchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.create({ user: req.user.id, ...req.body });
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
  if (req.user.id == podcast.user) {
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
  } else {
    return next(new ErrorHander("You can update only your podcast!", 403));
  }
});

exports.deletePodcast = catchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    return next(new ErrorHander("Podcast not found", 404));
  }

  if (req.user.id == podcast.user) {
    const deletePodcast = await Podcast.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      deletePodcast,
    });
  } else {
    return next(new ErrorHander("You can only delete your podcast!", 403));
  }
});

exports.addView = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    const { userId } = req.body;
    const podcast = await Podcast.findById(id);

    if (!podcast) {
      return res
        .status(404)
        .json({ success: false, message: "Podcast not found" });
    }
    if (userId) {
      if (!podcast.viewedBy.includes(userId)) {
        const viewsUpdate = await Podcast.findByIdAndUpdate(id, {
          $inc: { views: 1 },
          $push: { viewedBy: userId },
        });
        res.status(200).json({ success: true, viewsUpdate });
      }
    } else {
      const viewsUpdate = await Podcast.findByIdAndUpdate(id, {
        $inc: { views: 1 },
      });
      res.status(200).json({ success: true, viewsUpdate });
    }
  } catch (err) {
    next(err);
  }
});

exports.random = catchAsyncErrors(async (req, res, next) => {
  try {
    const randomPodcast = await Podcast.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json({ success: true, randomPodcast });
  } catch (err) {
    next(err);
  }
});

exports.random = catchAsyncErrors(async (req, res, next) => {
  try {
    const randomPodcast = await Podcast.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json({ success: true, randomPodcast });
  } catch (err) {
    next(err);
  }
});

exports.trend = catchAsyncErrors(async (req, res, next) => {
  try {
    const trendPodcast = await Podcast.find().sort({ view: -1 });
    res.status(200).json({ success: true, trendPodcast });
  } catch (err) {
    next(err);
  }
});

exports.likedContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { userId } = req.body;
    // const userId = req.user.id;
    console.log(userId);

    const podcast = await Podcast.findById(id);

    if (!podcast) {
      return res
        .status(404)
        .json({ success: false, message: "Podcast not found" });
    }

    if (!userId) {
      return res.status(401).json({ message: "User not logged in." });
    }
    if (!podcast.likes.includes(userId) && !podcast.dislikes.includes(userId)) {
      const likesUpdate = await Podcast.findByIdAndUpdate(id, {
        $push: { likes: userId },
      });
      res.status(200).json({ success: true, likesUpdate });
    } else if (
      !podcast.likes.includes(userId) &&
      podcast.dislikes.includes(userId)
    ) {
      await Podcast.findByIdAndUpdate(id, {
        $pull: { dislikes: userId },
      });
      const likesUpdate = await Podcast.findByIdAndUpdate(id, {
        $push: { likes: userId },
      });
    } else {
      if (podcast.likes.includes(userId))
        res.status(200).json({ success: true, message: "Already Liked" });
      else if (podcast.dislikes.includes(userId))
        res.status(200).json({ success: true, message: "Already Disliked" });
      else res.status(200).json({ success: true, message: "Already Done" });
    }
  } catch (err) {
    next(err);
  }
};

exports.dislikedContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { userId } = req.body;
    // const userId = req.user.id;
    console.log(userId);

    const podcast = await Podcast.findById(id);

    if (!podcast) {
      return res
        .status(404)
        .json({ success: false, message: "Podcast not found" });
    }

    if (!userId) {
      return res.status(401).json({ message: "User not logged in." });
    }
    if (!podcast.likes.includes(userId) && !podcast.dislikes.includes(userId)) {
      const dislikesUpdate = await Podcast.findByIdAndUpdate(id, {
        $push: { dislikes: userId },
      });
      res.status(200).json({ success: true, dislikesUpdate });
    } else if (
      podcast.likes.includes(userId) &&
      !podcast.dislikes.includes(userId)
    ) {
      await Podcast.findByIdAndUpdate(id, {
        $pull: { likes: userId },
      });
      const dislikesUpdate = await Podcast.findByIdAndUpdate(id, {
        $push: { dislikes: userId },
      });
      res.status(200).json({ success: true, dislikesUpdate });
    } else {
      if (podcast.likes.includes(userId))
        res.status(200).json({ success: true, message: "Already Liked" });
      else if (podcast.dislikes.includes(userId))
        res.status(200).json({ success: true, message: "Already Disliked" });
      else res.status(200).json({ success: true, message: "Already Done" });
    }
  } catch (err) {
    next(err);
  }
};
