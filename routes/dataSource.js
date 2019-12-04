let express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    mongoDB = require("../DataBases/MongoDB/mongoDBConnection"),
    mongoose = require('mongoose'),
    //    mongooseDynamic = require('mongoose-dynamic-schemas'),
    //this will read and parse the excel file
    XLSX = require('xlsx'),
    formidable = require('formidable'),
    {
        parse
    } = require('querystring');

const path = require('path');

//use this function to parse plain text
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'text/plain';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}

//this will create a empty schema
const excelSchema = new mongoose.Schema({}, {
    strict: false
});
const excelModel = mongoose.model('excelModel', excelSchema);

//creating a empty variable for sheets and columns
//let columns = [];
//let sheets = [];
//let excelSheets;
//let workbook;
let excelWorkbook = {};
//let excelSchema = {};
 

//Database form route to show the form
router.get("/new", function (req, res) {
    res.render("dataSource/New");
});


router.post("/", function (req, res) {
    if (req.headers["content-type"].match(/multipart\/form-data/gi)[0] === "multipart/form-data") {
        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            let f = files[Object.keys(files)[0]];
            let workbook = XLSX.readFile(f.path);
            /* DO SOMETHING WITH workbook HERE */
//            excelWorkbook = {};
//            excelSchema = {};
            for (let i = 0; i < workbook.SheetNames.length; i++) {
                //this will create a json object of the excel workbook
                let sheetName = workbook.SheetNames[i];
                let workSheet = workbook.Sheets[sheetName];
                excelWorkbook[sheetName] = XLSX.utils.sheet_to_json(workSheet, {
                    defval: "none"
                });
            }
            //this will create a mongoose schema from above JSON dynamically
            excelWorkbook[f.name.split(".")[0]] = new excelModel(excelWorkbook).save(err => {
                if (err) return handleError(err);
                // saved!
                console.log("Saved Successfully!!");
            });
            //        accessing the form data and creating a query string to send the variable to get route
            const querystring = require('querystring');
            collectRequestData(req, result => {
                const query = querystring.stringify({
                    "dataSourceName": f.name.split(".")[0]
//                    "tableNames": workbook.SheetNames
                });
//                res.send(query);
                res.redirect('/dataSource?' + query);
            });
        });
        //        this will get the sheet name from the form and send it to main route
    }
});



//datasource get Route
router.get("/", (req, res) => {
    //    mongoDB.datasource.find({}, (err, datasource) => {
    //        if(err) {
    //            console.log("Okey!, we didn't expect this");
    //        } else {
    //            res.render("DataSource/Index", {datasource: datasource});
    //        }
    //    });
    //    
    //this will go to put request    
    //    checking the encoding type for segregating the route
    if (req.query.dataSourceName !== undefined) {
        console.log(req.query.dataSourceName);
        excelSheets = []; //reset the array
        //        accessing the sheet name from the post route after replacing new line and carriage return
//        let passedVariable = req.query.tableNames.replace(/\s+/g, ' ').trim();
//        console.log(passedVariable);
        //getting the sheet data from database table
        excelModel.find({}, (err, excelModel) => {
            if (err) {
                console.log("Okey!, we didn't expect this");
            } else {
                for (let j = 0; j < excelModel.length; j++) {
                    excelSheets.push({
                        "ID": (excelModel[j])["_id"],
                        "Sheets": Object.keys(excelModel[j]["_doc"])[1]
                    });
                }
                res.render("dataSource/Update", {
                    excelModel: excelSheets,
                    dSource: req.query.dataSourceName
                });
            }
        });
    } 
//    else {
//        excelSheets = []; //reset the array
//        //getting the keys of database table
//        excelModel.find({}, (err, excelModel) => {
//            if (err) {
//                console.log("Okey!, we didn't expect this");
//            } else {
//                for (let j = 0; j < excelModel.length; j++) {
//                    excelSheets.push({
//                        "ID": (excelModel[j])["_id"],
//                        "Sheets": Object.keys(excelModel[j]["_doc"])[1]
//                    });
//                }
//                res.render("dataSource/Update", {
//                    excelModel: excelSheets
//                });
//            }
//        });
//
//    }






    //    let invoice = [{
    //        Invoice_Number: 1,
    //        Invoice_Entered_Date: "2016-05-18",
    //        Invoice_Received_Date: "2016-05-17",
    //        Invoice_Amount: 596,
    //        Gross_Amount: 800,
    //        Invoice_Date: "2016-04-18",
    //        Worflow_Created_Date: "2016-05-18",
    //        Due_Date: "2016-05-20",
    //        PO_Date: "2016-03-18",
    //        PO_Number: "201605A18",
    //        Discount_Terms: 10,
    //        Vendor_Id: "20160518",
    //        Payment_Reference_Number: "20191019"
    //    }];
    //    invoice.forEach(item => { 
    //      Object.keys(item).forEach(col => { 
    //             columns.push(col);
    //           }); 
    //       });
    //            res.render("dataSource", {
    //                columns:columns,
    //                sheets:sheets,
    //                worksheet:worksheet
    //            });
    //    let tables = Dynamic_HtmlTable(worksheet, 10);
    //    res.send(tables);

});

//
////Database post route
//router.post("/", function (req, res) {
//    //    get data from the form
//    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
//        let vName = req.body.vName;
//        let dSIMG = req.body.dSIMG;
//        let uName = req.body.uName;
//        let uPass = req.body.uPass;
//        let IP_DNS = req.body.IP_DNS;
//        let port = req.body.port;
//        let DBName = req.body.DBName;
//        let InsVal = req.body.InsVal;
//        let Domain = req.body.Domain;
//        let MSAuth = req.body.MSAuth;
//        let newDataSource = {
//            "Vendor Name": vName,
//            "Vendor Image": dSIMG,
//            "User name": uName,
//            "Password": uPass,
//            "Database host IP address or DNS name": IP_DNS,
//            "Port": port,
//            "Database name": DBName,
//            "Instance name (if any)": InsVal,
//            "Domain (SQL Server only)": Domain,
//            "Use Windows authentication": MSAuth
//        };
//        //    create a new datasource and save
//        mongoDB.datasource.create(newDataSource, (err, cat) => {
//            if (err) {
//                console.log(err);
//            } else {
//                console.log(cat);
//            }
//        });
//        res.redirect('/dataSource');
//        //get the excel data
//    } else if (req.headers["content-type"] === "multipart/form-data") {
//        let form = new formidable.IncomingForm();
//        form.parse(req, function (err, fields, files) {
//            let f = files[Object.keys(files)[0]];
//            workbook = XLSX.readFile(f.path);
//            /* DO SOMETHING WITH workbook HERE */
//            let excelWorkbook = {};
//            let excelSchema = {};
//            for (let i = 0; i < workbook.SheetNames.length; i++) {
//                //this will create a json object of the excel workbook
//                let sheetName = workbook.SheetNames[i];
//                let workSheet = workbook.Sheets[sheetName];
//                excelWorkbook[sheetName] = XLSX.utils.sheet_to_json(workSheet, {
//                    defval: "none"
//                });
//            }
//            //this will create a mongoose schema from above JSON dynamically
//            excelWorkbook[f.name.split(".")[0]] = new excelModel(excelWorkbook).save(err => {
//                if (err) return handleError(err);
//                // saved!
//                console.log("Saved Successfully!!");
//            });
//        });
//        res.redirect('/dataSource');
//        //        this will get the sheet name from the form and send it to main route
//    } else if (req.headers["content-type"] === "text/plain") {
////        accessing the form data and creating a query string to send the variable to get route
//        const querystring = require('querystring');
//        collectRequestData(req, result => {
//            const query = querystring.stringify({
//                "a": 1,
//                "b": 2,
//                "valid": result.key.split("_")[1]
//            });
//            res.redirect('/dataSource?' + query);
//        });
//    }
//});


////Database form route to show the form
//router.get("/:id", function (req, res) {
//    res.render("DataSource/Show");
//});



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
    for (let i = 0; i < rows; i++) {
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