var mongoose = require("mongoose");
var Order = mongoose.model("Order");
var Patient = mongoose.model("Patient");
var bcrypt = require("bcrypt");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

function authenticate(req, res) {
    sendJsonResponse(res, 200, {
        "token": "some-fake-token" + req.body.username + req.body.password
    });
}

function register(req, res) {
    let createdHash;
    bcrypt.genSalt(11, function(err, salt){
        if (err) return;
        bcrypt.hash(req.body.password, salt, function(err, hash){
            console.log("Created hash is... \n" + hash);
            if (err) return;
            createdHash = hash; 
            sendJsonResponse(res, 200,{
                "hash": createdHash
            });
        });
    });

}
module.exports = {
    authenticate: authenticate,
    register: register
}