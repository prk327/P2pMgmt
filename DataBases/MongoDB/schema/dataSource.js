var mongoose        = require('mongoose');
//    mongooseDynamic = require('mongoose-dynamic-schemas');

var databaseSchema = new mongoose.Schema(
     {
          "Vendor Name": String,
          "Vendor Image": String,
          "User name":String,
          "Password":String,
          "Database host IP address or DNS name": String,
          "Port": Number,
          "Database name": String,
          "Instance name (if any)": String,
          "Domain (SQL Server only)": String,
          "Use Windows authentication": Boolean
     }
);

var databaseSchema_Model = mongoose.model("databaseSchema_Model", databaseSchema);

module.exports = databaseSchema_Model;