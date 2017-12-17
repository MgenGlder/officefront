var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
})

mongoose.model("Patient", patientSchema);