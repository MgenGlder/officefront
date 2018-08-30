var mongoose = require("mongoose");
var Order = mongoose.model("Order");
var Patient = mongoose.model("Patient");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

function createOrder(req, res) { //generic, TODO: create a unique function for each type of test.
    Patient
        .findOne({
            firstName: req.body.patientFirstName,
            lastName: req.body.patientLastName,
            dateOfBirth: req.body.patientDateOfBirth
        }, (err, patient) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status": "error",
                    "message": err
                })
                return;
            }
            else if (!patient) {
                sendJsonResponse(res, 404, {
                    "status": "error",
                    "message": "Patient was not found"
                })
                return;
            }
            else {
                if (req.body["testID"]) {
                    createOrderSchemaTest(patient, req, res);
                }
                else if (req.body.nursePurpose) {
                    createOrderSchemaNurse(patient, req, res);
                }
                else {
                    createOrderSchema(patient, req, res);
                }
            }
        })
}

function orderOptions(req, res) {
    console.log(req.query);
    switch (req.query.type) {
        case "specialist":
            sendJsonResponse(res, 200, [
                { value: 'podiatrist', text: 'Podiatrist' },
                { value: 'optometrist', text: 'Optometrist' },
                { value: 'cardiologist', text: 'Cardiologist' },
                { value: 'neurologist', text: 'Neurologist' },
                { value: 'dermatologist', text: 'Dermatologist' },
                { value: 'pain-doctor', text: 'Pain Doctor' },
                { value: 'psychiatrist', text: 'Psychiatrist' },
                { value: 'ent', text: 'ENT' },
                { value: 'physical-therapy', text: 'Physical Therapy' }
            ])
            break;
        case "test":
            sendJsonResponse(res, 200, [
                { value: 'x-ray', text: 'X-Ray', location: true },
                { value: 'ekg', text: 'EKG', location: true },
                { value: 'pft', text: 'PFT', location: false },
                { value: 'eye-exam', text: 'Eye Exam', location: false },
                { value: 'doppler', text: 'Doppler (Pedal Or Carotid)', location: true },
                { value: 'ultrasound', text: 'Ultrasound', location: true },
                { value: 'urology', text: 'Urology/Urinalysis', location: false }
            ]);
            break;
        case "bloodwork":
            sendJsonResponse(res, 200, [
                { value: 'hgb-aic-level', text: 'Hgb. AIC Level' },
                { value: 'bun-creat', text: 'BUN, CREAT' },
                { value: 'cholesterol', text: 'Cholesterol/PSA' },
                { value: 'lipid-profile', text: 'Lipid Profile' },
                { value: 'cbc-with-diff', text: 'CBC With Diff' },
                { value: 'comp-tsh-lft', text: 'COMP TSH LFT' },
                { value: 'metabolic-panel', text: 'Metabolic Panel' }
            ]);
            break;
        case 'nurse':
            sendJsonResponse(res, 200, [
                { value: 'rn-monitor-bp', text: 'Monitor BP' },
                { value: 'rn-monitor-bs', text: 'Monitor BS' },
            ])
    }

}

function createOrderSchema(lookedUpPatient, req, res) {
    Order
        .create({
            "patient": lookedUpPatient._id,
            "type": req.body.typeOfOrder,
            "reason": req.body.reason,
            "location": req.body.location,
            "notes": req.body.notes,
            "dateOfVisit": req.body.dateOfVisit,
            "visitingDoctor": req.body.visitingDoctor,
            "reporter": req.body.reporter,
            "status": "new",
            "statuses": req.body.statuses
        }).then((order) => {
            sendJsonResponse(res, 200, {
                "status": "ok",
                "message": order
            });
        })
}
function createOrderSchemaTest(lookedUpPatient, req, res) {
    // TODO: If the order doesnt contain statuses (because its optional), then dont throw a null pointer
    Order
        .create({
            "patient": lookedUpPatient._id,
            "type": req.body.typeOfOrder,
            "reason": req.body.reason,
            "location": req.body.location,
            "notes": req.body.notes,
            "dateOfVisit": req.body.dateOfVisit,
            "visitingDoctor": req.body.visitingDoctor,
            "reporter": req.body.reporter,
            "testID": req.body.testID,
            "status": "new",
            "statuses": req.body.statuses
        }).then((order) => {
            sendJsonResponse(res, 200, {
                "status": "ok",
                "message": order
            });
        })
}
function createOrderSchemaNurse(lookedUpPatient, req, res) {
    Order
        .create({
            "patient": lookedUpPatient._id,
            "type": req.body.typeOfOrder,
            "reason": req.body.reason,
            "location": req.body.location,
            "notes": req.body.notes,
            "dateOfVisit": req.body.dateOfVisit,
            "visitingDoctor": req.body.visitingDoctor,
            "reporter": req.body.reporter,
            "nursePurpose": req.body.nursePurpose,
            "status": "new",
            "statuses": req.body.statuses
        }).then((order) => {
            sendJsonResponse(res, 200, {
                "status": "ok",
                "message": order
            });
        })
}

function getOrder(req, res) {
    Order
        .findById(req.query.uniqueID, (err, orders) => {
            if (err) {
                sendJsonResponse(res, 400, {
                    "status": "error",
                    "message": err
                })
            }
            else if (!patient) {
                sendJsonResponse(res, 400, {
                    "status": "error",
                    "message": "Order was not found"
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

function updateOrder(req, res) {
    let fields = ["type", "dateOfVisit", "visitingDoctor", "visitingDoctor", "location", "notes", "reporter", "reason", "patient", "status"];
    Order.findById(req.body.uniqueID, (err, order) => {
        if (err) {
            sendJsonResponse(res, 400, {
                "status": "error",
                "message": err
            })
        }
        else if (!order) {
            sendJsonResponse(res, 404, {
                "status": "error",
                "message": "Patient could not be found"
            })
        }
        else {
            for (let field of fields) {

                if (req.body[field] != null &&
                    req.body[field] != undefined &&
                    req.body[field] != order[field])
                    order[field] = req.body[field];
            }
            order.save((err, order) => {
                if (err || !order) {
                    sendJsonResponse(res, 400, {
                        "status": "error",
                        "message": "Error saving the order"
                    })
                }
                else {
                    sendJsonResponse(res, 200, {
                        "status": "ok",
                        "message": "Patient updated successfully"
                    })
                }
            })

        }
    })
}

function getAllOrders(req, res) {
    Order
        .find({}, (err, orders) => {
            // if (err) {
            //     sendJsonResponse(res, 400, {
            //         "status": "error",
            //         "message": err
            //     })
            // }
            // else {
            //     sendJsonResponse(res, 200, {
            //         "status": "ok",
            //         "message": orders
            //     })
            // }
            sendJsonResponse(res, 200, orders);
        })
        .populate("patient");
}

function getAllOrdersSpecificPatient(req, res) {
    Order
        .find({
            'patient.firstName': req.query.patientFirstName,
            'patient.lastName': req.body.patientLastName,
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
    getOrder: getOrder,
    getAllOrders: getAllOrders,
    createOrder: createOrder,
    getAllOrdersSpecificPatient: getAllOrdersSpecificPatient,
    updateOrder: updateOrder,
    orderOptions: orderOptions
}