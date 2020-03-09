const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title"],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, "Please fill in this field"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating"]
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

ReviewSchema.statics.getAverageRating = async function(id) {
  const arr = await this.aggregate([
    {
      $match: { camp: id }
    },
    {
      $group: {
        _id: "$camp",
        averageRating: { $avg: "$rating" }
      }
    }
  ]);

  try {
    await this.model("Camp").findByIdAndUpdate(id, {
      averageRating: arr[0].averageRating
    });
  } catch (err) {
    console.error(err.message);
  }
};

ReviewSchema.post("save", function() {
  this.constructor.getAverageRating(this.camp);
});

ReviewSchema.pre("remove", function() {
  this.constructor.getAverageRating(this.camp);
});

module.exports = mongoose.model("Review", ReviewSchema);
