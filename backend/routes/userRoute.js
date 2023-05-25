const express = require("express");
const {
} = require("../controllers/adminController");
const router = express.Router();

router.route("/").post(createPodcast);


module.exports = router;
