var mongoose        = require('mongoose');
//    mongooseDynamic = require('mongoose-dynamic-schemas');

var paymentSchema = new mongoose.Schema({
    Payment_Reference_Number: String, //unique ID
    Payment_Date: Date,
    Payment_Terms: String,
    Pay_Terms: String,
    Currency: String,
    Payment_Status: String,
    Scheduled_Payment_Date: Date,
    Invoice: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice_Model"
        }
    ],
    Vendors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor_Model"
        }
    ]
});

var Payment_Model = mongoose.model("Payment_Model", paymentSchema);

module.exports = Payment_Model;