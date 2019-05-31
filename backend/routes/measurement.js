const express = require("express");
const crypto = require('crypto');
//const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bottumMeasuremnt = require("../models/bottumMeasurement");
const shirtMeasuremnt = require("../models/shirtMeasurement");
const customerAuth = require("../middleware/check-customer-auth");

const router = express.Router();

router.post("/saveShirtMeasuremnt", (req, res, next) => {

    measurementData = JSON.parse(req.body.data);
    const measuremnt = new shirtMeasuremnt({
        MeasurementNeck: measurementData.MeasurementNeck,
        MeasurementShoulderW: measurementData.MeasurementShoulderW,
        MeasurementBicep: measurementData.MeasurementBicep,
        MeasurementJacketL: measurementData.MeasurementJacketL,
        MeasurementSleeveL: measurementData.MeasurementSleeveL,
        MeasurementChest: measurementData.MeasurementChest,
        customerId: req.body.id
    });

    measuremnt.save()
        .then((result) => {
            // console.log(result);
            res.status(200).json({
                message: 1,
                id: result._id
            });
        })
        .catch((result) => {
            console.log(result);
            res.status(200).json({
                message: 0,
                id: ""
            });
        });
});


router.post("/saveBottumMeasuremnt", (req, res, next) => {

    measurementData = JSON.parse(req.body.data);
    const measuremnt = new bottumMeasuremnt({
        MeasurementPantsW: measurementData.MeasurementPantsW,
        MeasurementHips: measurementData.MeasurementHips,
        MeasurementLength: measurementData.MeasurementLength,
        MeasurementCrotch: measurementData.MeasurementCrotch,
        MeasurementThigh: measurementData.MeasurementThigh,
        MeasurementKnee: measurementData.MeasurementKnee,
        customerId: req.body.id
    });

    measuremnt.save()
        .then((result) => {
            //  console.log(result);
            res.status(200).json({
                message: 1,
                id: result._id
            });
        })
        .catch((result) => {
            console.log(result);
            res.status(200).json({
                message: 0,
                id: ""
            });
        });
});

router.post("/updateBottumMeasuremnt", (req, res, next) => {

    measurementData = JSON.parse(req.body.data);
    measurementId = req.body.id;
    const measuremnt = {
        MeasurementPantsW: measurementData.MeasurementPantsW,
        MeasurementHips: measurementData.MeasurementHips,
        MeasurementLength: measurementData.MeasurementLength,
        MeasurementCrotch: measurementData.MeasurementCrotch,
        MeasurementThigh: measurementData.MeasurementThigh,
        MeasurementKnee: measurementData.MeasurementKnee,
        customerId: req.body.id
    };

    bottumMeasuremnt.updateOne({
            customerId: req.body.id
        }, measuremnt)
        .then((result) => {
            // console.log(result);
            res.status(200).json({
                message: 1,
                id: result._id
            });
        })
        .catch((result) => {
            console.log(result);
            res.status(200).json({
                message: 0,
                id: ""
            });
        });
});

router.post("/updateShirtMeasuremnt", (req, res, next) => {

    measurementData = JSON.parse(req.body.data);
    customerd = req.body.id;
    const measuremnt = {
        MeasurementNeck: measurementData.MeasurementNeck,
        MeasurementShoulderW: measurementData.MeasurementShoulderW,
        MeasurementBicep: measurementData.MeasurementBicep,
        MeasurementJacketL: measurementData.MeasurementJacketL,
        MeasurementSleeveL: measurementData.MeasurementSleeveL,
        MeasurementChest: measurementData.MeasurementChest,
        customerId: req.body.id
    };

    shirtMeasuremnt.updateOne({
            customerId: req.body.id
        }, measuremnt)
        .then((result) => {
            //  console.log(result);
            res.status(200).json({
                message: 1,
                id: result._id
            });
        })
        .catch((result) => {
            console.log(result);
            res.status(200).json({
                message: 0,
                id: ""
            });
        });
});



router.post("/getBottum", (req, res, next) => {

    bottumMeasuremnt.find({ customerId: req.body.id }, (err, data) => {
        let message = 0;
        if (data.length > 0) {
            message = 1;
            //  console.log(data);

        }
        if (err) {
            console.log(err);
        }
        if (message == 1) {
            res.status(200).json({
                message: 1,
                result: data
            });
        }

        if (message == 0) {
            res.status(200).json({
                message: 0,
                result: {}
            });
        }
    });
});

router.post("/getShirt", (req, res, next) => {

    shirtMeasuremnt.find({ customerId: req.body.id }, (err, data) => {
        let message = 0;
        if (data.length > 0) {
            message = 1;
            console.log(data);

        }
        if (err) {
            console.log(err);
        }


        res.status(200).json({
            message: message,
            result: data
        });



        /*if (message == 0) {
            res.status(200).json({
                message: 0,
                result: {}
            });
        }*/
    });
});

module.exports = router;