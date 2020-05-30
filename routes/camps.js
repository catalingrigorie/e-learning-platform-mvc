const express = require("express");
const {
  createCamp,
  getCamp,
  getCamps,
  updateCamp,
  deleteCamp,
  uploadImage,
  signUp,
} = require("../controllers/camps");

const { protect, access, checkOwnership } = require("../middleware/auth");
const Camp = require("../models/Camp");
const customResults = require("../middleware/customResults");
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");
const router = express.Router();
router.use("/:id/courses", courseRouter);
router.use("/:id/reviews", reviewRouter);
router
  .route("/")
  .post(protect, access("publisher", "admin"), createCamp)
  .get(customResults(Camp, "courses"), getCamps);
router
  .route("/:id")
  .get(getCamp)
  .put(protect, access("publisher", "admin"), checkOwnership(Camp), updateCamp)
  .delete(
    protect,
    access("publisher", "admin"),
    checkOwnership(Camp),
    deleteCamp
  );

router
  .route("/:id/image")
  .put(
    protect,
    access("publisher", "admin", "user"),
    checkOwnership(Camp),
    uploadImage
  );

router.route("/:id/signup").post(protect, signUp);

module.exports = router;
