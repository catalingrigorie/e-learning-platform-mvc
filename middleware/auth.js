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
    }

    if (!token) {
      return next(res.status(401).json("Not allowed navigate this route"));
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await user.findById(decode.id);
    next();
  } catch (error) {
    console.error(error.message);
  }
};
