var express             = require("express"),
    app                 = express(),
//we need body parser in case of html form where we want to fetch the data from the user and do somethig woth it
    bodyParser          = require("body-parser"),
// getting-started with mongodb
    mongoDB             = require("./DataBases/MongoDB/mongoDBConnection"),
//this will load the routes
    indexRoute          = require("./routes/index"),
    dataSourceRoute     = require("./routes/dataSource"),
    methodOverride      = require('method-override');

//to enable put and delete request in html form
app.use(methodOverride('_method'));

//to parse the form data
app.use(bodyParser.urlencoded({extended: true}));

//this will serve the public directory, and then we can use any template from that directory
app.use(express.static("public"));

//this is to not write the page extention
app.set("view engine", "ejs");

//this will enable multifolder view
app.set('views', './views');

//using the index route in the app
app.use("/", indexRoute);

//use the database route
app.use("/dataSource", dataSourceRoute);

//pages for undefined routes
app.get("*", (req, res) => res.send("Sorry! page not found....What are you doing with your life>"));

app.listen(3000, () => console.log("The p2p test server is started"));