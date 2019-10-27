let express         = require("express"),
    router          = express.Router({mergeParams: true}),
    mongoDB         = require("../DataBases/MongoDB/mongoDBConnection"),
    mongoose        = require('mongoose'),
    mongooseDynamic = require('mongoose-dynamic-schemas'),
//this will read and parse the excel file
    XLSX            = require('xlsx'),
    formidable      = require('formidable');


const path = require('path');

//this will create a empty schema
var dynamicSchema   = mongoose.Schema({});
var dynamicModel    = mongoose.model('dynamics', dynamicSchema);

//creating a empty variable for sheets and columns
var columns = [];
var sheets  = [];
var workbook;

//Database get Route
router.get("/", (req, res) => {
    let invoice = [{
        Invoice_Number: 1,
        Invoice_Entered_Date: "2016-05-18",
        Invoice_Received_Date: "2016-05-17",
        Invoice_Amount: 596,
        Gross_Amount: 800,
        Invoice_Date: "2016-04-18",
        Worflow_Created_Date: "2016-05-18",
        Due_Date: "2016-05-20",
        PO_Date: "2016-03-18",
        PO_Number: "201605A18",
        Discount_Terms: 10,
        Vendor_Id: "20160518",
        Payment_Reference_Number: "20191019"
    }];
    var columns = [];
    invoice.forEach(item => { 
      Object.keys(item).forEach(col => { 
             columns.push(col);
           }); 
       });
            res.render("dataSource", {
                columns:columns,
                sheets:sheets
            });
//    invoice.filter(item => console.log(item["Invoice_Number"]));
//        }
//    });
});

//Database create route
router.post("/", function(req, res){
    //get data from the form and add to dashboard array
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var f = files[Object.keys(files)[0]];
        workbook = XLSX.readFile(f.path);
        /* DO SOMETHING WITH workbook HERE */
        for (i = 0; i < workbook.SheetNames.length; i++){
            sheets.push(workbook.SheetNames[i]);
        }
    });
//redirect back to dashboard page
    res.redirect("/dataSource");
});

//Database form route to show the form
router.get("/new", function(req, res){
    res.render("Data_Form");
});

module.exports = router;