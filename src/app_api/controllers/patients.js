var mongoose = require("mongoose");
var Patient = mongoose.model("Patient");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

function createPatient(req, res) {
    Patient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth
    }, (err, location) => {
        if (err) {
            sendJsonResponse(res, 400, {
                "status": "ok",
                "data": "Patient creation failed"
            })
        }
        else {
            sendJsonResponse(res, 400, {
                "status": "ok",
                "data": "Patient created successfully"
            })
        }
    })
}

function getAllPatients(req, res) {
    Patient
        .find({}, (err, patients) => {
            if (!err && patients.length >= 1) {
                sendJsonResponse(res, 200, patients);
            }
        })
}

function getPatient(req, res) {
    Patient
        .findOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        .exec((err, patient) => {
            if (!patient) {
                sendJsonResponse(res, 404, {
                    "message": "Patient not found"
                })
                return;
            }
            else if (err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            else {
                sendJsonResponse(res, 404, response);
            }
        })
}

module.exports = {
    createPatient: createPatient,
    getAllPatients: getAllPatients,
    getPatient: getPatient
}