var mongoose = require("mongoose");
var Order    = mongoose.model("Order");
var Patient  = mongoose.model("Patient");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);

}

function createOrder(req, res) { //generic, TODO: create a unique function for each type of test.
    var associatedPatient;
    Patient
        .findOne({
            firstName: req.boy.patientFirstName,
            lastName: req.body.patientLastName,
            dateOfBirth: req.body.patientDateOfBirth
        }, (err, patient) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status" : "error",
                    "message": err
                })
                console.log("could not find the patient");
                return;
            }
            else {
                associatedPatient = patient;
                sendJsonResponse(res, 200, {
                    "status" : ok,
                    "message": patient
                })
            }
        })
    Order
        .create({
            "patient"       : associatedPatient,
            "type"          : req.body.type,
            "reason"        : req.body.reason,
            "location"      : req.body.location,
            "notes"         : req.body.notes,
            "dateOfVisit"   : req.body.dateOfVisit,
            "visitingDoctor": req.body.visitingDoctor,
            "reporter"      : req.body.reporter,
            "uniqueID"      : `${req.body.patientLastName}${req.body.patientFirstName}${req.body.patientDateOfBirth}${req.body.type}${req.body.dateOfVisit}${req.body.visitingDoctor}`
            //not the best solution because the patient's name might change.
            //might have to use mongo functions to do validation before order updates.
        }, (err, order) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status": "error",
                    "message": err
                });
            }
            else {
                sendJsonResponse(res, 200, {
                    "status": "ok",
                    "message": "Order was created successfully"
                });
            }
        })
}

function getOrder(req, res) {
    console.log(req.query);
    Order
        .findOne({
            "uniqueID": req.query.uniqueID
        }, (err, orders) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status": "error",
                    "message": err
                })
            }
            else {
                sendJsonResponse(res, 200, {
                    "status": "ok",
                    "message": orders
                })
            }
        })
    // .exec((err, orders) => {

    // });
}

function getAllOrders(req, res) {
    Order
        .find({}, (err, orders) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status": "error",
                    "message": err
                })
            }
            else {
                sendJsonResponse(res, 200, {
                    "status": "ok",
                    "message": orders
                })
            }
        })
}

function getAllOrdersSpecificPatient(req, res){
    Order
        .find({
                'patient.firstName'  : req.query.patientFirstName,
                'patient.lastName'   : req.body.patientLastName,
                'patient.dateOfBirth': req.body.patientDateOfBirth
            }, (err, allPatientOrders) => {
                if (err) {
                    sendJsonResponse(res, 400, {
                        "status": "error",
                        "message": err
                    })
                }
                else {
                    sendJsonResponse(res, 200, {
                        "status": "ok",
                        "message": allPatientOrders
                    });
                }
            })
}
module.exports = {
    getOrder    : getOrder,
    getAllOrders: getAllOrders,
    createOrder : createOrder
}