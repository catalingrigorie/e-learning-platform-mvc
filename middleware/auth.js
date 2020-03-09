const jwt = require("jsonwebtoken");
const user = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(
        res.status(401).json({
          error: "Not allowed navigate this route"
        })
      );
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decode.id);
    next();
  } catch (error) {
    return next(
      res.status(401).json({
        error: error.message,
        message: "Not allowed navigate this route"
      })
    );
  }
};

exports.access = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          res.status(403).json({
            message: "You do not have access to do this"
          })
        );
      }
      next();
    };
  } catch (error) {
    return next(
      res.status(400).json({
        error: error.message
      })
    );
  }
};

exports.checkOwnership = model => async (req, res, next) => {
  try {
    let resource = await model.findById(req.params.id);

    if (!resource) {
      return next(
        res.status(404).json({
          message: "Not found"
        })
      );
    }

    if (req.user.role !== "admin" && resource.user.toString() !== req.user.id) {
      return next(
        res.status(401).json({
          message: "You do not have access"
        })
      );
    }
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};
