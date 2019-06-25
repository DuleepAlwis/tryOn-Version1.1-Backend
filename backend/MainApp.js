const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const fs = require("fs");
const fileReader = require("./HelperFunctions/fileReaders");
const userRoute = require("./routes/user");
const customerRoute = require("./routes/customer");
const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");
const measuremntRoute = require("./routes/measurement");
const app = express();
const CONNECTION_URL = "mongodb+srv://dulip:dulip123@cluster0-gwlhh.mongodb.net/tryondb?retryWrites=true";
//const CONNECTION_URL = process.env.CONNECTION_URL; //fileReader.readDBString();
const mongoLocal = 'mongodb://localhost:27017/tryondb';
//console.log(fileReader.readDBString());
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dulip:<password>@cluster0-gwlhh.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});
*/
/*console.log(process.env['CONNECTION_URL']);
const directoryPath = path.join(__dirname, './configurations');

fs.readdir(directoryPath, function(err, files) {
    console.log("AAA");
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function(file) {
        // Do whatever you want to do with the file
        console.log(file);
        fs.readFile(directoryPath + '/configuraions.json', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data.toString());
            }

        });
    });
});*/
/*fs.readFile('./configurations/configuraions.json', (err, data) => {
    if (err) {
        console.log(err);
        return null;
    } else {
        console.log(data);
        jsonObj = JSON.parse(data);
        console.log(jsonObj.CONNECTION_URL);
        return jsonObj.CONNECTION_URL;
    }
});*/
let con = 0;
setTimeout(() => {
    console.log(CONNECTION_URL);
    mongoose
        .connect(CONNECTION_URL, {
            useNewUrlParser: true
        })
        .then(() => {
            con = 1;
            console.log("connected to the remote database");
        })
        .catch((err) => {
            console.log(err.message);
            console.log("connection failed to the remote server");
        })
}, 7000);

/*setTimeout(() => {
    if (con != 1) {
        mongoose
            .connect(mongoLocal, {
                useNewUrlParser: true
            })
            .then(() => {
                console.log("connected to the local database");
            })
            .catch(() => {
                console.log("connection failed to the local server");
            })
    }
}, 11000);
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/images", express.static(path.join("backend/images")));
//var jsonParser = bodyParser.json();
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

//app.use(cors);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS"
    );
    next();
});




app.post("/api/user/login1", (req, res, next) => {
    console.log(req.body.email);
})



app.use("/api/user", userRoute);
app.use("/api/customer", customerRoute);
app.use("/api/clothes", productRoute);
app.use("/api/Accessories", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/measurement", measuremntRoute);
console.log("Server is on.......");
module.exports = app;