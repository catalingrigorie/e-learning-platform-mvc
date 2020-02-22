const Camp = require("../models/Camp");

/**
 * @description Creates a camp
 * @route api/v1/camps
 * @method POST
 */
exports.createCamp = async (req, res, next) => {
  try {
    const camp = await Camp.create(req.body);

    res.status(201).json({
      success: true,
      data: camp
    });
  } catch (error) {
    let message = null;

    if (error.name === "ValidationError") {
      message = Object.values(error.errors).map(error => error.message);
    }

    if (error.code == 11000) {
      message = `${Object.keys(error.keyValue)} field must be unique`;
    }

    res.status(400).json({
      error: error
    });
  }
};

/**
 * @description Gets all camps from database
 * @route api/v1/camps
 * @method GET
 */
exports.getCamps = async (req, res, next) => {
  try {
    let query;
    let queryString = JSON.stringify(req.query);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );

    query = Camp.find(JSON.parse(queryString)).populate("courses");

    const camps = await query;

    res.status(200).json({
      success: true,
      data: camps
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

/**
 * @description Gets a single camp from db,
 * @route api/v1/camps/:id
 * @method GET
 */
exports.getCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id).populate("courses");

    if (!camp) {
      return res.status(404).json({
        error: "Not found"
      });
    }

    res.status(200).json({
      data: camp
    });
  } catch (error) {
    res.status(404).json({
      error: "Not found"
    });
  }
};

/**
 * @description Updates a camp,
 * @route api/v1/camps/:id
 * @method PUT
 */
exports.updateCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!camp) {
      return res.status(404).json({
        message: "Not found"
      });
    }

    res.status(200).json({
      data: camp
    });
  } catch (error) {
    res.status(404).json({
      error: "Not found"
    });
  }
};

/**
 *
 * @description Deletes a camp,
 * @route api/v1/camps/:id
 * @method DELETE
 */
exports.deleteCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({
        message: "Not found"
      });
    }

    camp.remove();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(404).json({
      error: "Not found"
    });
  }
};
