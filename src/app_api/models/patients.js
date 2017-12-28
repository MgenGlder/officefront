var mongoose = require("mongoose");
var patientSchema = require("./patients");
var Schema = mongoose.Schema;

var patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
})

mongoose.model("Patient", patientSchema);

module.exports = {
    patientSchema: patientSchema
}