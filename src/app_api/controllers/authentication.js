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
    // bcrypt.genSalt(11, function(err, salt){
    //     if (err) return next(err);
    //     bcrypt.hash(req.body.password, salt, function(err, hash){
    //         if (err) return next(err);
    //         newUser.password = hash;
    //     });
    // });
    sendJsonResponse(res, 200,{
        "response": "added salt to password"
    });
}
module.exports = {
    authenticate: authenticate,
    register: register
}