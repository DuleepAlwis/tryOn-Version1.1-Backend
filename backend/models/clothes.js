const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const clothedProductSchema = mongoose.Schema({
  name: {
    type: String
    //required: true
  },
  category: {
    type: String,
    required: true
  },
  large: {
    type: Object
  },
  medium: {
    type: Object

  },
  small: {
    type: Object

  },
  color: {
    type: Array

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

});

//clothProductSchema.plugin(uniqueValidator);
module.exports = mongoose.model("clothes", clothedProductSchema);
