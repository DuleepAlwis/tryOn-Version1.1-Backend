const mongoose = require("mongoose");
const beltsSchema = new mongoose.Schema({
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

module.exports = mongoose.model("belts", beltsSchema);
