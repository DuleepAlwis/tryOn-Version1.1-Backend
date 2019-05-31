const mongoose = require("mongoose");
const capsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  quantity: {
    type: Number
  },
  width: {
    type: Number
  },
  imgFront: {
    type: String
  },
  imgLeft: {
    type: String
  },
  imgRight: {
    type: String
  },
  imgBack: {
    type: String
  }


})

module.exports = mongoose.model("caps", capsSchema);
