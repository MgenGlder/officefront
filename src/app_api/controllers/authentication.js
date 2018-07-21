var mongoose = require("mongoose");
var Order = mongoose.model("Order");
var Patient = mongoose.model("Patient");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

function authenticate(req, res) {
    
    sendJsonResponse(res, 200, {
        "token": "some-fake-token" + req.body.username + req.body.password
    });
}
module.exports = {
    authenticate: authenticate
}