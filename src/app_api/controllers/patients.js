var mongoose = require("mongoose");
var Patient = mongoose.model("Patient");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);

}

function createPatient(req, res) {
    Patient.create({
        firstName: "Kunle",
        lastName: "Oshiyoye"
    }, (err, location) => {
        if (err) {
            sendJsonResponse(res, 200, {
                "status": "ok",
                "data": "createPatient api called."
            })
        }
        else {
            sendJsonResponse(res, 200, {
                "status": "ok",
                "data": "createPatient api called."
            })
        }
    })
}

function getAllPatients(req, res) {
    sendJsonResponse(res, 200, {
        "status": "ok",
        "data": "getAllPatients api called."
    });
}

function getPatient(req, res) {
    sendJsonResponse(res, 200, {
        "status": "ok",
        "data": "getPatient api called."
    });
}

module.exports = {
    createPatient: createPatient,
    getAllPatients: getAllPatients,
    getPatient: getPatient
}