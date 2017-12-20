var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    type: String,
    dateOfVisit: Date,
    visitingDoctor: String,

});

mongoose.model("Order", orderSchema);