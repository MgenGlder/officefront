var mongoose = require("mongoose");
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
    status        : String,
    testID        : String,
    nursePurpose  : String,
    statuses: {
        type: [{ name: String, user: String, timeCompleted: String }], 
        default: [
            {name: 'Order Reviewed', user: null, timeCompleted: null},
            {name: 'CPC Created', user: null, timeCompleted: null},
            {name: 'Sent To MD', user: null, timeCompleted: null},
            {name: 'Received From MD', user: null, timeCompleted: null},
            {name: 'Sent To Agency', user: null, timeCompleted: null},
            {name: 'Completed', user: null, timeCompleted: null}
        ]
    }
});

mongoose.model("Order", orderSchema);

