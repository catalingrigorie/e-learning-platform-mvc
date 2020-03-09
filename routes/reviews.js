const express = require("express");
const {
  getReviews,
  getReview,
  createReview
} = require("../controllers/reviews");
const router = express.Router({ mergeParams: true });
const customResults = require("../middleware/customResults");
const { protect, access, checkOwnership } = require("../middleware/auth");
const Review = require("../models/Review");

router
  .route("/")
  .get(
    customResults(Review, {
      path: "camp",
      select: "name description"
    }),
    getReviews
  )
  .post(protect, access("user", "admin", "publisher"), createReview);

router.route("/:id").get(getReview);

module.exports = router;
