var mongoose        = require('mongoose');
//    mongooseDynamic = require('mongoose-dynamic-schemas');

var vendorSchema = new mongoose.Schema({
    Vendor_Type: String,
    Vendor_Id: String, //unique ID
    Vendor_Name: String,
    Payment_Method: String,
    Invoice: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice_Model"
        }
    ],
    Payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment_Model"
        }
    ]
});

var Vendor_Model = mongoose.model("Vendor_Model", vendorSchema);

module.exports = Vendor_Model;