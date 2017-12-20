var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date
})

mongoose.model("Patient", patientSchema);