const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bottumMeasuremntSchema = mongoose.Schema({
  MeasurementPantsW:{
    type:String
  },
  MeasurementHips:{
    type:String
  },
  MeasurementLength:{
    type:String
  },
  MeasurementCrotch:{
    type:String
  },
  MeasurementThigh:{
    type:String
  },
  MeasurementKnee:{
    type:String
  },
  customerId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
});

//clothProductSchema.plugin(uniqueValidator);
module.exports = mongoose.model("measuremntBottum", bottumMeasuremntSchema);
