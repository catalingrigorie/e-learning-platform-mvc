const { getNlEmails, createNlEmails } = require("../controllers/newsletter");
const customResults = require("../middleware/customResults");
const { protect, access, checkOwnership } = require("../middleware/auth");
const Newsletter = require("../models/Newsletter");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(customResults(Newsletter), getNlEmails)
  .post(createNlEmails);

module.exports = router;
