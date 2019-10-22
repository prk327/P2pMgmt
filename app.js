var express     = require("express"),
    app         = express(),
//we need body parser in case of html form where we want to fetch the data from the user and do somethig woth it
    bodyParser  = require("body-parser"),
// getting-started with mongodb
    mongoose    = require('mongoose'),
//this will read and parse the excel file
    XLSX        = require('xlsx'),
    formidable  = require('formidable'),
//this will import the invoice, vendor and payment module
    invoice     = require("./models/invoice"),
    vendor      = require("./models/vendor"),
    payment     = require("./models/payment");

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/vendors', {useNewUrlParser: true});

//checking for connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log("DB Connected!");
});







//The next step is compiling our schema into a Model.




////adding invoice to invoice db
//var inv_1st = new Invoice_Model({
//    Invoice_Number: 1, 
//    Invoice_Entered_Date: "2016-05-18",
//    Invoice_Received_Date: "2016-05-17",
//    Invoice_Amount: 596,
//    Gross_Amount: 800,
//    Invoice_Date: "2016-04-18",
//    Worflow_Created_Date: "2016-05-18",
//    Due_Date: "2016-05-20",
//    PO_Date: "2016-03-18",
//    PO_Number: "201605A18",
//    Discount_Terms: 10,
//    Vendor_Id: "20160518",
//    Payment_Reference_Number: "20191019"
//});

////saving the document into the database
//inv_1st.save(function(err, inv){
//    if(err){
//        console.log("Something went wrong!");
//    } else {
//        console.log("We just saved one invoice into the DB!");
//        console.log(inv);
//    }
//});

//the above code of creating and saving can be done on a single go, using create command
//Invoice_Model.create({
//    Invoice_Number: 2, 
//    Invoice_Entered_Date: "2016-09-18",
//    Invoice_Received_Date: "2016-04-17",
//    Invoice_Amount: 9654,
//    Gross_Amount: 12100,
//    Invoice_Date: "2016-03-27",
//    Worflow_Created_Date: "2016-10-20",
//    Due_Date: "2016-11-24",
//    PO_Date: "2016-02-06",
//    PO_Number: "201586405B27",
//    Discount_Terms: 20,
//    Vendor_Id: "20160519",
//    Payment_Reference_Number: "20191011"
//}, function(err, inv){
//    if(err){
//        console.log("Oh No, Error!!");
//        console.log(err);
//    } else {
//        console.log("All the invoices");
//        console.log(inv);
//    }
//});

//retrive all invoices from the db and console.log each one
invoice.find({}, function(err, inv){
    if(err){
        console.log("Oh No, Error!!");
        console.log(err);
    } else {
        console.log("All the invoices");
        console.log(inv);
    }
});





app.use(bodyParser.urlencoded({extended: true}));

//this will serve the public directory, and then we can use any template from that directory
app.use(express.static("public"));

//this is to not write the page extention
app.set("view engine", "ejs");

//Home page route
app.get("/", (req, res) => res.render("landing"));

//Dashboard get Route
app.get("/Dashboard", (req, res) => {
    Invoice_Model.find({}, function(err, inv){
        if(err){
            console.log("Oh No, Error!!");
            console.log(err);
        } else {
            console.log("All the invoices");
            res.render("D3_Visu", {invoice:inv});
        }
    });
});

//dashboard post route
app.post("/Dashboard", function(req, res){
//    res.send("you hit the post route");
    //get data from the form and add to dashboard array
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var f = files[Object.keys(files)[0]];
        var workbook = XLSX.readFile(f.path);
        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        console.log(workbook.SheetNames.length);
    });
    //redirect back to dashboard page
    res.redirect("/Dashboard");
});

//to show the form to get the data
app.get("/Dashboard/new", function(req, res){
    res.render("Data_Form");
});


//pages for undefined routes
app.get("*", (req, res) => res.send("Sorry! page not found....What are you doing with your life>"));

app.listen(3000, () => console.log("The p2p test server is started"));