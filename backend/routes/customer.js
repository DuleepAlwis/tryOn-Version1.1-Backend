const express = require("express");
const crypto = require('crypto');
//const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const Customer = require("../models/customerUser");
const customerAuth = require("../middleware/check-customer-auth");

//const userEmployee = require("");

const router = express.Router();
/*router.post("/updateProfile",(req,res,next)=>{
    const postData = req.body;

})*/

router.post("/getProfile", customerAuth,(req, res, next) => {
  const id = req.body.id;
  //console.log(id);
  Customer.findById({
    _id: id
  }, (err, result) => {
    //console.log(result);
    if (result) {
      result.info.email = result.email;
      console.log(result.info);
      res.status(200).json({
        message: 1,
        result: result.info
      })
    } else {
      console.log(result);
      console.log(id);
      res.status(200).json({
        message: 0,
        result: result
      })
    }
  })
})

router.post("/updateProfile",customerAuth, (req, res, next) => {
  const id = req.body.id;
  const postData = req.body.data;
  console.log(id);
  console.log(postData);
  const customer = {
    info: {
      name: postData.name,
      address: postData.address,
      city: postData.city,
      district: postData.district,
      mobileno: postData.mobileno
    }
  }
  Customer.updateOne({
      _id: id
    }, customer)
    .then(result => {
      // console.log("OK");
      //console.log(result);
      //console.log(info);
      res.status(200).json({
        message: 1,
        result: customer.info
      });
    })
    .catch(
      result => {
        /* console.log(result);
         console.log("No");*/
        res.status(200).json({
          message: 0,
          data: null
        });
      }
    );
});


module.exports = router;
