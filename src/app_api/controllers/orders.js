var mongoose = require("mongoose");
var Order = mongoose.model("Order");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);

}

function createOrder(req, res) { //generic, TODO: create a unique function for each type of test.
    Order
        .create({
            "type"          : req.body.type,
            "reason"        : req.body.reason,
            "location"      : req.body.location,
            "notes"         : req.body.notes,
            "dateOfVisit"   : req.body.dateOfVisit,
            "visitingDoctor": req.body.visitingDoctor,
            "reporter"      : req.body.reporter
        }, (err, order) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status" : "error",
                    "message": err
                });
            }
            else {
                sendJsonResponse(res, 200, {
                    "status" : "ok",
                    "message": "Order was created successfully"
                });
            }
        })
}

function getOrder(req, res) {
    Order
        .findOne({
            "type"          : req.params.type,
            "dateOfVisit"   : new Date(req.params.dateOfVisit),
            "visitingDoctor": req.params.visitingDoctor,
        })
        .exec((err, orders) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status" : "error",
                    "message": err
                })
            }
            else {
                sendJsonResponse(res, 200, {
                    "status" : "ok",
                    "message": orders
                })
            }
        });
}

function getAllOrders(req, res) {
    Order
        .find({}, (err, orders) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status" : "error",
                    "message": err
                })
            }
            else {
                sendJsonResponse(res, 200, {
                    "status" : "ok",
                    "message": orders
                })
            }
        })
}
module.exports = {
    getOrder: getOrder,
    createOrder: createOrder
}