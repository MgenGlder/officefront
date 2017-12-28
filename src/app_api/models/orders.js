var mongoose = require("mongoose");
var patientSchema = require("./patients");
var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
    type          : String,
    dateOfVisit   : String,
    visitingDoctor: String,
    location      : String,
    notes         : String,
    reporter      : String,
    reason        : String,
    patient       : {type: Schema.Types.ObjectId, ref: 'Patient'},
    status        : String
});

mongoose.model("Order", orderSchema);

