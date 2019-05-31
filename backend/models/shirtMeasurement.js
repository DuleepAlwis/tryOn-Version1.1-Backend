const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const shirtMeasuremntSchema = mongoose.Schema({
    MeasurementNeck: {
        type: String
    },
    MeasurementShoulderW: {
        type: String
    },
    MeasurementBicep: {
        type: String
    },
    MeasurementJacketL: {
        type: String
    },
    MeasurementSleeveL: {
        type: String
    },
    MeasurementChest: {
        type: String
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

//clothProductSchema.plugin(uniqueValidator);
module.exports = mongoose.model("measuremntShirt", shirtMeasuremntSchema);