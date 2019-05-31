const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userCustomerSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
    },
  role: {
    type: String
  },
  info: {
    type: Object
  }
});

userCustomerSchema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userCustomerSchema);
