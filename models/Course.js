const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"]
  },
  description: {
    type: String,
    required: [true, "Please add a description"]
  },
  duration: {
    type: String,
    required: [true, "Please specify a duration for the course"]
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"]
  },
  difficulty: {
    type: String,
    required: [true, "Please specify difficulty level"],
    enum: ["Beginner", "Intermediate", "Advanced"]
  },
  availableJob: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  camp: {
    type: mongoose.Schema.ObjectId,
    ref: "Camp",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

CourseSchema.statics.getAverageCost = async function(id) {
  const arr = await this.aggregate([
    {
      $match: { camp: id }
    },
    {
      $group: {
        _id: "$camp",
        averageCost: { $avg: "$tuition" }
      }
    }
  ]);

  try {
    await this.model("Camp").findByIdAndUpdate(id, {
      averageCost: Math.ceil(arr[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.error(err.message);
  }
};

CourseSchema.post("save", function() {
  this.constructor.getAverageCost(this.camp);
});

CourseSchema.pre("remove", function() {
  this.constructor.getAverageCost(this.camp);
});

module.exports = mongoose.model("Course", CourseSchema);
