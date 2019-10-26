// getting-started with mongodb
let mongoose    = require('mongoose'),
//this will import the invoice, vendor and payment schema
    invoice     = require("./schema/invoice"),
    vendor      = require("./schema/vendor"),
    payment     = require("./schema/payment");
mongoose.set('useUnifiedTopology', true);
//creating new database if not exist
let databaseName = "vendors";
//connecting to the above database or creating if not exist
mongoose.connect("mongodb://localhost:27017/" + databaseName + "", {useNewUrlParser: true});
//checking for connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log("" + databaseName + " Connected!");
});
//exporting the database schema
module.exports = {
    invoice :   invoice,
    vendor  :   vendor,
    payment :   payment
};