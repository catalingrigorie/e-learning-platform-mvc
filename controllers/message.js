const Message = require("../models/Message");

exports.createMessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    res.status(200).json(res.customResults);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
