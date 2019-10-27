var express         = require("express"),
    app             = express(),
//we need body parser in case of html form where we want to fetch the data from the user and do somethig woth it
    bodyParser      = require("body-parser"),
// getting-started with mongodb
    mongoDB         = require("./DataBases/MongoDB/mongoDBConnection"),
////this will read and parse the excel file
//this will load the routes
    indexRoute      = require("./routes/index"),
    dataSourceRoute   = require("./routes/dataSource");

//retrive all invoices from the db and console.log each one
//mongoDB.invoice.find({}, function(err, inv){
//    if(err){
//        console.log("Oh No, Error!!");
//        console.log(err);
//    } else {
//        console.log("All the invoices");
//        console.log(inv);
//    }
//});

app.use(bodyParser.urlencoded({extended: true}));

//this will serve the public directory, and then we can use any template from that directory
app.use(express.static("public"));

//this is to not write the page extention
app.set("view engine", "ejs");

//using the index route in the app
app.use("/", indexRoute);
//use the database route
app.use("/dataSource", dataSourceRoute);

//pages for undefined routes
app.get("*", (req, res) => res.send("Sorry! page not found....What are you doing with your life>"));

app.listen(3000, () => console.log("The p2p test server is started"));