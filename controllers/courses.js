const Course = require("../models/Course");
const Camp = require("../models/Camp");

/**
 * @desc Get all courses or all courses for a specific camp
 * @route /api/v1/courses
 * @method GET
 * @param id
 */
exports.getCourses = async (req, res, next) => {
  try {
    if (req.params.id) {
      const courses = await Course.find({ camp: req.params.id });

      return res.status(200).json({
        data: courses,
        count: courses.length,
      });
    } else {
      res.status(200).json(res.customResults);
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

/**
 * @desc Get a single course
 * @method GET
 * @route /api/v1/courses/:id
 */
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "camp",
      select: "name description",
    });

    if (!course) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    res.status(200).json({
      data: courses,
    });
  } catch (error) {
    res.status(404).json({
      error: "Not found",
    });
  }
};

/**
 * @desc Creates a course based on a id
 * @route  /api/v1/camps/:id/courses
 * @method POST
 * @param id
 */
exports.createCourse = async (req, res, next) => {
  try {
    req.body.camp = req.params.id;
    req.body.user = req.user.id;
    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    const course = await Course.create(req.body);

    res.status(200).json({
      data: course,
    });
  } catch (error) {
    res.status(404).json({
      error: "Not found",
    });
  }
};

/**
 * @desc Updates a course
 * @route /api/v1/courses/:id
 * @method PUT
 */
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    res.status(200).json({
      data: course,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

/**
 *
 * @desc Deletes a course
 * @route /api/v1/courses/:id
 * @method DELETE
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    await course.remove();

    res.status(200).json({
      data: {},
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
