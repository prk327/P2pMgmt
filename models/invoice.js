var mongoose    = require('mongoose');

var invoiceSchema = new mongoose.Schema({
    Invoice_Number: String, 
    Invoice_Entered_Date: Date,
    Invoice_Received_Date: Date,
    Invoice_Amount: Number,
    Gross_Amount: Number,
    Invoice_Date: Date,
    Worflow_Created_Date: Date,
    Due_Date: Date,
    PO_Date: Date,
    PO_Number: String,
    Discount_Terms: String,
    Vendors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor_Model"
        }
    ],
    Payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment_Model"
        }
    ]
});

var Invoice_Model = mongoose.model("Invoice_Model", invoiceSchema);

module.exports = Invoice_Model;