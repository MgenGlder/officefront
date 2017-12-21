import { String } from "core-js/library/web/timers";

var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    type              : String,
    dateOfVisit       : Date,
    visitingDoctor    : String,
    uniqueID          : String,
    patientFirstName  : String,
    patientlastName   : String,
    patientDateOfBirth: Date
    

});

mongoose.model("Order", orderSchema);