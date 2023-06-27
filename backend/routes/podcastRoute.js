const express = require("express");
const {
  createPodcast,
  getAllPodcast,
  getPodcastDetails,
  updatePodcast,
  deletePodcast,
  addView,
  random,
  trend,
  likedContent,
  dislikedContent,
} = require("../controllers/podcastController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/").post(isAuthenticatedUser, createPodcast);
router.route("/").get(getAllPodcast);

router
  .route("/:id")
  .get(getPodcastDetails)
  .put(isAuthenticatedUser, updatePodcast)
  .delete(isAuthenticatedUser, deletePodcast);

router.route("/view/:id").put(isAuthenticatedUser, addView);
router.route("/random/view").get(random);
router.route("/trend/view").get(trend);
router.route("/likes/:id").put(isAuthenticatedUser, likedContent);
router.route("/dislikes/:id").put(isAuthenticatedUser, dislikedContent);

module.exports = router;
