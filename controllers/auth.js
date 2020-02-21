const User = require("../models/User");

/**
 * @description Regiser
 * @route Get /v1/register
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

/**
 * @description Login
 * @route Get /v1/login
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(res.status(400).json("Please enter all fields"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(
        res.status(401).json({
          error: "Invalid email or passowrd"
        })
      );
    }

    const isValidPassword = await user.matchPassword(password);

    if (!isValidPassword) {
      return next(
        res.status(401).json({
          error: "Invalid email or passowrd"
        })
      );
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
