const express = require("express");
const {
  createCamp,
  getCamp,
  getCamps,
  updateCamp,
  deleteCamp
} = require("../controllers/camps");
const courseRouter = require("./courses");
const router = express.Router();
router.use("/camps/:campId/courses", courseRouter);
router
  .route("/camps")
  .post(createCamp)
  .get(getCamps);
router
  .route("/camps/:id")
  .get(getCamp)
  .put(updateCamp)
  .delete(deleteCamp);

module.exports = router;
