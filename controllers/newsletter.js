const Newsletter = require("../models/Newsletter");

exports.createNlEmails = async (req, res, next) => {
  try {
    const newsletter = await Newsletter.create(req.body);

    res.status(201).json({
      success: true,
      data: newsletter,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getNlEmails = async (req, res, next) => {
  try {
    res.status(200).json(res.customResults);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
