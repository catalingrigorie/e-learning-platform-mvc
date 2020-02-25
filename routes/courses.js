const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");
const router = express.Router({ mergeParams: true });
const Course = require("../models/Course");
const customResults = require("../middleware/customResults");
const { protect, access } = require("../middleware/auth");

router
  .route("/")
  .get(
    customResults(Course, {
      path: "camp",
      select: "name description"
    }),
    getCourses
  )
  .post(protect, access("publisher", "admin"), createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, access("publisher", "admin"), updateCourse)
  .delete(protect, access("publisher", "admin"), deleteCourse);

module.exports = router;
