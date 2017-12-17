var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    type: String,
    doctor: String
});

mongoose.model("Order", orderSchema);