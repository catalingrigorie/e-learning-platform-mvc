const Camp = require("../models/Camp");
const User = require("../models/User");
const path = require("path");
const sendMail = require("../utils/email");

/**
 * @description Creates a camp
 * @route api/v1/camps
 * @method POST
 */
exports.createCamp = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const camp = await Camp.create(req.body);

    res.status(201).json({
      success: true,
      data: camp,
    });
  } catch (error) {
    let message = null;

    if (error.name === "ValidationError") {
      message = Object.values(error.errors).map((error) => error.message);
    }

    if (error.code == 11000) {
      message = `${Object.keys(error.keyValue)} field must be unique`;
    }

    res.status(400).json({
      error: error.message,
    });
  }
};

/**
 * @description Gets all camps from database
 * @route api/v1/camps
 * @method GET
 */
exports.getCamps = async (req, res, next) => {
  try {
    res.status(200).json(res.customResults);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/**
 * @description Gets a single camp from db,
 * @route api/v1/camps/:id
 * @method GET
 */
exports.getCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id)
      .populate("courses")
      .populate("user");

    if (!camp) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    res.status(200).json({
      data: camp,
    });
  } catch (error) {
    res.status(404).json({
      error: "Not found",
    });
  }
};

/**
 * @description Updates a camp,
 * @route api/v1/camps/:id
 * @method PUT
 */
exports.updateCamp = async (req, res, next) => {
  try {
    let camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    // camp = await Camp.updateOne(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    camp = await Camp.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      data: camp,
    });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      error: "Not found",
    });
  }
};

/**
 *
 * @description Deletes a camp,
 * @route api/v1/camps/:id
 * @method DELETE
 */
exports.deleteCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    camp.remove();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      error: "Not found",
    });
  }
};

/**
 *
 * @description Uploads a image for a camp,
 * @route api/v1/camps/:id/photo
 * @method PUT
 */
exports.uploadImage = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    if (!req.files) {
      return next(
        res.status(400).json({
          message: "Please upload an image",
        })
      );
    }

    const file = req.files.file;

    if (!file.mimetype.startsWith("image")) {
      return next(
        res.status(400).json({
          message: "That doesn't look like an image file",
        })
      );
    }

    // 2000000 = 2MB
    if (file.size > 2000000) {
      return next(
        res.status(400).json({
          message: "Please upload an image with size less than 2MB",
        })
      );
    }

    file.name = `image_${camp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.IMAGE_UPLOAD_PATH}/${file.name}`, async (error) => {
      if (error) {
        console.error(error.message);
        return next(
          res.status(500).json({
            error: "Something went wrong",
          })
        );
      }

      await Camp.findByIdAndUpdate(req.params.id, {
        image: file.name,
      });

      res.status(200).json({
        data: file.name,
      });
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id);
    console.log(req.params.id);
    console.log(req.body);
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user || !camp) {
      return next(
        res.status(404).json({
          error: "Not found",
        })
      );
    }

    const html = `
    <h1>Hello ${user.name}, welcome to ${camp.name} </h1>
    <h2>You are receiving this email because you singed up ${camp.name} on e-learning platform</h2>
    `;

    await sendMail({
      email: user.email,
      subject: "Bootcamp signup",
      html,
    });

    return res.status(200).json({
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
