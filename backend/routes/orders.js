const express = require("express");
const crypto = require('crypto');
//const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const order = require("../models/order");
const Clothes = require("../models/clothes");
const Tights = require("../models/tights");
const Gloves = require("../models/gloves");
const Belts = require("../models/belts");
const Caps = require("../models/caps");
const HandBags = require("../models/handbags");
const customerAuth = require("../middleware/check-customer-auth");

const router = express.Router();

router.post("/addOrder", customerAuth, (req, res, next) => {
    let delivery = req.body.delivery;
    let items = req.body.items;
    // console.log(req.body);
    const orderNew = new order({
        date: req.body.date,
        time: req.body.time,
        dueDate: req.body.dueDate,
        items: items,
        delivery: delivery,
        totalPrice: req.body.totalPrice,
        comment: "",
        status: "NC",
        customerId: req.body.customerId
    });
    //console.log(orderNew);
    orderNew.save()
        .then((result) => {
            console.log(result);


            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'duleepalwis0@gmail.com',
                    pass: 'duleep3alwis'
                }
            });

            var mailOptions = {
                from: '<anonymous>',
                to: req.body.email,
                subject: 'You placed an order',
                html: '<p><h3>You placed an order</h3>Date : ' + req.body.date + ' Time : ' + req.body.time + ' ' + '</p>' + '<p><h3>Rs. ' + req.body.totalPrice + '</h3></p>'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            updateQuantity(req.body.items, res);

            /*res.status(200).json({
                message: 1
            });*/
        })
        .catch((result) => {
            console.log(result);
            res.status(200).json({
                message: 0
            });
        });
});


router.post("/retrieveCustomerOrders", customerAuth, (req, res, next) => {

    console.log("AAA");
    order.find({
        customerId: req.body.id
    }, (err, orders) => {
        //console.log(clothItem);
        if (orders) {
            message = 1;
        }
        if (err) {
            console.log(err);
        }
        console.log(orders);
        res.status(200).json({
            message: message,
            result: orders
        });
    });
});

router.post("/getOrder", customerAuth, (req, res, next) => {
    order.findById({ _id: req.body.id }, (err, order) => {
        let message = 0;
        console.log(order);
        if (order) {
            message = 1;
        }
        if (err) {
            console.log(err);
        }

        res.status(200).json({
            message: message,
            result: order
        });
    });
});

router.post("/getAllOrder", (req, res, next) => {
    order.find({}, (err, order) => {
        let message = 0;
        if (order) {
            message = 1;
        }
        if (err) {
            console.log(err);
        }

        res.status(200).json({
            message: message,
            result: order
        });
    });
});


//router.post("/quantityUpdate", (req, res, next) => {
//console.log(req.body.products);
function updateQuantity(items, res) {
    let products = JSON.parse(req.body.products);
    /*console.log(products);
    console.log(typeof((products[0])));
    console.log(typeof(products));*/

    let i = products.length;
    let j = 0;
    let items = [];
    let num = i;
    for (j = 0; j < i; j++) {
        items.push(products[j]);
    }

    //console.log(items);
    for (j = 0; j < i; j++) {
        let quant = parseInt(items[j].quantity) * (-1);

        //let size = (items[j].size).toLowerCase() + ".quantity";
        let size = "";
        let updateObj = {};
        if (items[j].size) {
            switch (items[j].size) {
                case "Large":
                    updateObj = { "large.quantity": quant };
                    break;
                case "Small":
                    updateObj = { "small.quantity": quant };
                    break;
                case "Medium":
                    updateObj = { "medium.quantity": quant };
                    break;

            }
        }
        // console.log(size);
        switch (items[j].category) {
            case "Shirts":

                Clothes.updateOne({ _id: items[j].productId }, { "$inc": updateObj })
                    .then(
                        result => {
                            console.log(result);
                            console.log(quant);
                            num = num - 1;
                        }
                    )
                    .catch(
                        result => {
                            console.log(result);
                            return res.status(200).json({
                                message: 0
                            });
                        }
                    );
                break;



            case "Tights":

                Tights.updateOne({ _id: items[j].productId }, { "$inc": updateObj })
                    .then(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 1
                            });
                        }
                    )
                    .catch(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 0
                            });
                        }
                    );
                break;

            case "Caps":

                Caps.updateOne({ _id: items[j].productId }, { "$inc": { quantity: qunat } })
                    .then(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 1
                            });
                        }
                    )
                    .catch(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 0
                            });
                        }
                    );
                break;

            case "HandBags":

                HandBags.updateOne({ _id: items[j].productId }, { "$inc": { quantity: qunat } })
                    .then(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 1
                            });
                        }
                    )
                    .catch(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 0
                            });
                        }
                    );
                break;

            case "Gloves":

                Gloves.updateOne({ _id: items[j].productId }, { "$inc": { quantity: qunat } })
                    .then(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 1
                            });
                        }
                    )
                    .catch(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 0
                            });
                        }
                    );
                break;

            case "Belts":

                Belts.updateOne({ _id: items[j].productId }, { "$inc": { quantity: qunat } })
                    .then(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 1
                            });
                        }
                    )
                    .catch(
                        result => {
                            console.log(result);
                            res.status(200).json({
                                message: 0
                            });
                        }
                    );
                break;








        }

    }
    if (num == 0) {
        res.status(200).json({
            message: 1
        });
    } else {
        res.status(200).json({
            message: 0
        });
    }
}
//});
module.exports = router;