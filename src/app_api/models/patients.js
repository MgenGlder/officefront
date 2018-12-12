var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
})

mongoose.model("Patient", patientSchema);