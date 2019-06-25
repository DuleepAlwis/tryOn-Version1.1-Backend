const fs = require("fs");
const path = require('path');

const directoryPath = path.join(__dirname, '../configurations');

module.exports = {
    readDBString: function() {
        try {
            fs.readFileSync(directoryPath + '/configuraions.json', (err, data) => {
                if (err) {
                    console.log(err);
                    return null;
                } else {
                    console.log(data);
                    jsonObj = JSON.parse(data);
                    console.log(jsonObj.CONNECTION_URL);
                    process.env.CONNECTION_URL = jsonObj.CONNECTION_URL;
                    return jsonObj.CONNECTION_URL;
                }
            });
        } catch (error) {
            console.log("!@#" + error);
        }
    }
}