const mogoose = require("mongoose");

const bannerSchema = mogoose.Schema({
  image: {
    type: String,
    required: true
  }
});

const Banner = mogoose.model("Banners", bannerSchema);
module.exports = Banner;