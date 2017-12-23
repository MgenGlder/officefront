var mongoose = require("mongoose");
var patientSchema = require("./patients");

var orderSchema = new mongoose.Schema({
    type              : String,
    dateOfVisit       : Date,
    visitingDoctor    : String,
    uniqueID          : String,
    patientFirstName  : String,
    patientlastName   : String,
    patientDateOfBirth: Date,
    patient: [patientSchema]
});

mongoose.model("Order", orderSchema);

