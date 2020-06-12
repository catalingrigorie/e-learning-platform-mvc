const User = require("../models/User");
const sendMail = require("../utils/email");
const crypto = require("crypto");

/**
 * @description Regiser
 * @route POST /api/v1/auth/register
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @description Login
 * @route POST /api/v1/auth/register
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(res.status(400).json("Please enter all fields"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(
        res.status(401).json({
          error: "Invalid email or password",
        })
      );
    }

    const isValidPassword = await user.matchPassword(password);

    if (!isValidPassword) {
      return next(
        res.status(401).json({
          error: "Invalid email or password",
        })
      );
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getLoggedInUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 1 * 1000),
    });

    res.status(200).json({
      data: {},
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(
        res.status(404).json({
          error: "Not found",
        })
      );
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: true });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `Make a put request to ${resetUrl}`;

    await sendMail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    return res.status(200).json({
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    console.error(error.message);
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        res.status(400).json({
          error: "Invalid",
        })
      );
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const fields = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const match = await user.matchPassword(req.body.currentPassword);

    if (!match) {
      return next(
        res.status(401).json({
          error: "Password is inccorrect",
        })
      );
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
