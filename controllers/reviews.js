const Camp = require("../models/Camp");
const Review = require("../models/Review");

exports.getReviews = async (req, res, next) => {
  try {
    if (req.params.id) {
      const reviews = await Review.find({ camp: req.params.id });

      return res.status(200).json({
        reviews,
        count: reviews.length
      });
    } else {
      res.status(200).json(res.customResults);
    }
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate({
      path: "camp",
      select: "name description"
    });

    if (!review) {
      return next(
        res.status(404).json({
          error: "Not found"
        })
      );
    }

    res.status(200).json({
      data: review
    });
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
};

exports.createReview = async (req, res, next) => {
  try {
    req.body.camp = req.params.id;
    req.body.user = req.user.id;
    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return next(
        res.status(404).json({
          error: "Not found"
        })
      );
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      data: review
    });
  } catch (error) {
    res.status(401).json({
      error: error.message
    });
  }
};
