const { createMessage, getMessages } = require("../controllers/message");
const customResults = require("../middleware/customResults");
const { protect, access, checkOwnership } = require("../middleware/auth");
const Message = require("../models/Message");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(protect, access("admin"), customResults(Message), getMessages)
  .post(createMessage);

module.exports = router;
