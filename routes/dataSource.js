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
let dynamicSchema   = mongoose.Schema({});
let dynamicModel    = mongoose.model('dynamics', dynamicSchema);

//creating a empty variable for sheets and columns
let columns = [];
let sheets  = [];
let worksheet;
let workbook;

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
    invoice.forEach(item => { 
      Object.keys(item).forEach(col => { 
             columns.push(col);
           }); 
       });
            res.render("dataSource", {
                columns:columns,
                sheets:sheets,
                worksheet:worksheet
            });
//    let tables = Dynamic_HtmlTable(worksheet, 10);
//    res.send(tables);

});

//router.get("/:table", (req, res) => {
//    let subTable = req.params.table;
//    let tables = Dynamic_HtmlTable(worksheet, 10);
//    res.send("Welcome to the " + table + "page!" + tables);
////    console.log(req.params);
//});

//Database create route
router.post("/", function(req, res){
    //get data from the form and add to dashboard array
    console.log(req.body.upload);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var f = files[Object.keys(files)[0]];
        workbook = XLSX.readFile(f.path);
        /* DO SOMETHING WITH workbook HERE */
        for (i = 0; i < workbook.SheetNames.length; i++){
            sheets.push(workbook.SheetNames[i]);
//          worksheet = generateJSONEngine(workbook, 'Table');
        }
    });
//redirect back to dashboard page
    res.redirect("/dataSource");
});

//Database form route to show the form
router.get("/new", function(req, res){
    res.render("Data_Form");
});



//jason export function
generateJSONEngine = (workbook, sheetName) => {
    var XLSX = require('xlsx');
    var workbook = workbook;
    var sheet_name_list = workbook.SheetNames;
//    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[sheetName];
        var headers = {};
        var data = [];
        for(z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;
            //store header names
            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }
            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        return data;
//    });  
}

//dynamic html table function from JSON Object
Dynamic_HtmlTable = (Dataframe, rows) => {
//        let Dataframe = worksheet;
        let Header = Object.keys(Dataframe[0]);
        let thead = "";
        let body = "";
        Header.forEach(item => {
            thead += "<th>" + item + "</th>";
        });
        let rowhead = "<thead><tr>" + thead + "</tr></thead>";
        let row = "";
        for(let i = 0; i < rows; i++){
            let dim = "";
            Header.forEach(column => {
                dim += "<td>" + Dataframe[i][column] + "</td>";
            });
            row += "<tr>" + dim + "</tr>";
        }
        body += rowhead + "<tbody>" + row + "</tbody>";
        return "<table>" + body + "</table>";
}

module.exports = router;