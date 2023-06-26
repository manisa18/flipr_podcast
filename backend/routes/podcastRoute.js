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
  addViewNoLogin,
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

module.exports = router;
