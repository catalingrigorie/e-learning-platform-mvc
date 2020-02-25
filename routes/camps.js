const express = require("express");
const {
  createCamp,
  getCamp,
  getCamps,
  updateCamp,
  deleteCamp,
  uploadImage
} = require("../controllers/camps");

const { protect, access } = require("../middleware/auth");
const Camp = require("../models/Camp");
const customResults = require("../middleware/customResults");
const courseRouter = require("./courses");
const router = express.Router();
router.use("/:campId/courses", courseRouter);
router
  .route("/")
  .post(protect, access("publisher", "admin"), createCamp)
  .get(customResults(Camp, "courses"), getCamps);
router
  .route("/:id")
  .get(getCamp)
  .put(protect, access("publisher", "admin"), updateCamp)
  .delete(protect, access("publisher", "admin"), deleteCamp);

router
  .route("/:id/image")
  .put(protect, access("publisher", "admin"), uploadImage);

module.exports = router;
