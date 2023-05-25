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
} = require("../controllers/podcastController");
const router = express.Router();

router.route("/").post(createPodcast);
router.route("/").get(getAllPodcast);

router
  .route("/:id")
  .get(getPodcastDetails)
  .put(updatePodcast)
  .delete(deletePodcast);

router.route("/view/:id").put(addView);
router.route("/random/view").get(random);
router.route("/trend/view").get(trend);

module.exports = router;
