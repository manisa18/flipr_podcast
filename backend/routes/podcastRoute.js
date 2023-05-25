const express = require("express");
const {
  createPodcast,
  getAllPodcast,
  getPodcastDetails,
  updatePodcast,
  deletePodcast,
} = require("../controllers/podcastController");
const router = express.Router();

router.route("/").post(createPodcast);
router.route("/").get(getAllPodcast);

router
  .route("/:id")
  .get(getPodcastDetails)
  .put(updatePodcast)
  .delete(deletePodcast);

module.exports = router;
