const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const orderSchema = mongoose.Schema({
  date: {
    type: String
    //required: true
  },

  time: {
    type: String
  },

  dueDate: {
    type: String
    //required: true
  },

  items: {
    type: String
  },

  delivery: {
    type: String
  },

  totalPrice: {
    type: String
  },

  comment: {
    type: String
  },
  status: {
    type: String
  },

  customerId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }


});

//clothProductSchema.plugin(uniqueValidator);
module.exports = mongoose.model("order", orderSchema);
