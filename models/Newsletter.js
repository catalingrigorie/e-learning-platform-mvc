const mongoose = require("mongoose");

const NewsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: [true, "Please add an email address"],
  },
});

module.exports = mongoose.model("Newsletter", NewsLetterSchema);
