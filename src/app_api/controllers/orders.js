var mongoose = require("mongoose");
var Order = mongoose.model("Order");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);

}

function createOrder (req, res) {
    sendJsonResponse (res, 200, { 
        "status": "ok", 
        "data": "createOrder api called."
    });
}

function getOrder (req, res) {
    sendJsonResponse (res, 200, {
        "status": "ok",
        "data": "getOrder api called"
    })
}

module.exports = {
    getOrder   : getOrder,
    createOrder: createOrder
}