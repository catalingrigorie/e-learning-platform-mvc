const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name"],
    maxlength: 100,
  },
  subject: {
    type: String,
    required: [true, "Please specify a subject"],
  },
  message: {
    type: String,
    required: [true, "Please add your message"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: [true, "Please add an email address"],
  },
});

module.exports = mongoose.model("Message", MessageSchema);
