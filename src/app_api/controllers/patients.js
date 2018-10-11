var mongoose = require("mongoose");
var Patient = mongoose.model("Patient");
const { refreshToken } = require('../utils/refreshToken');

var sendJsonResponse = function(req, res, status, content) {
    content.refreshedToken = refreshToken(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
            sendJsonResponse(req, res, 400, {
                "status": "ok",
                "data": "Patient creation failed"
            })
        }
        else {
            sendJsonResponse(req, res, 200, {
                "status": "ok",
                "data": "Patient created successfully"
            })
        }
    })
}

function updatePatient(req, res) {
    Patient
        .findOne({
            firstName  : req.body.firstName,
            lastName   : req.body.lastName,
            dateOfBirth: req.body.dateOfBirth
        }, (err, patient) => {
            if (err) {
                sendJsonResponse(req, res, 400, err)
            }
            else if (!patient) {
                sendJsonResponse(req, res, 404, {
                    "status" : "error",
                    "message": "Patient was not found"
                })
            }
            else {
                if (req.body.newFirstName)
                    patient.firstName   = req.body.newFirstName;
                if (req.body.newLastName)
                    patient.lastName    = req.body.newLastName;
                if (req.body.newDateOfBirth)
                    patient.dateOfBirth = req.body.newDateOfBirth;
                //currently not able to edit the orders assigned to the patient.
                //TODO: Allow to edit the orders assigned to the particular patient.
                patient.save((err, patient) => {
                    if (err || !patient) {
                        sendJsonResponse(req, res, 400, {
                            "status" : "error",
                            "message": "There was an error saving the patient",
                            "error"  : err
                        });
                    }
                    else {
                        sendJsonResponse(req, res, 200, {
                            "status" : "ok",
                            "message": "Patient was updated successfully"
                        })
                    }
                });

            }
        })
}

function getAllPatients(req, res) {
    Patient
        .find({}, (err, patients) => {
            if (!err && patients.length >= 1) {
                sendJsonResponse(req, res, 200, patients);
            }
        })
}

function getPatient(req, res) {
    Patient
        .findOne({
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            dateOfBirth: req.query.dateOfBirth
        })
        .exec((err, patient) => {
            if (!patient) {
                sendJsonResponse(req, res, 404, {
                    "message": "Patient not found"
                })
                return;
            }
            else if (err) {
                console.log(err);
                sendJsonResponse(req, res, 400, err);
                return;
            }
            else {
                sendJsonResponse(req, res, 200, {
                    status: "ok",
                    message: patient
                });
            }
        })
}

module.exports = {
    createPatient : createPatient,
    getAllPatients: getAllPatients,
    getPatient    : getPatient,
    updatePatient : updatePatient
}