const mongoose = require("mongoose");
const gloveSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  quantity: {
    type: Number
  },
  length: {
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

module.exports = mongoose.model("gloves", gloveSchema);
