const mongoose = require("mongoose");

const productReviewShema = mongoose.Schema({
  buyerId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    require: true
  }
});
const ProductReview = mongoose.model("ProductReviews",productReviewShema);
module.exports = ProductReview;