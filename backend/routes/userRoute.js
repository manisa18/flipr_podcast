const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router
  .route("/:id")
  .put(isAuthenticatedUser, updateUser)
  .delete(isAuthenticatedUser, deleteUser)
  .get(getUser);

module.exports = router;
