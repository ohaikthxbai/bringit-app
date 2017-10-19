//Get dependencies
var connection = require("./connection.js");

//Set the ORMs
var orm = {
//Query to select all elements
selectAll: function(table, vals, cb) {
    var val = vals[0];
    
    queryString = "SELECT * FROM "+table+" WHERE USER_ID = '"+val+"';"

    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  } ,
  insertBracket: function(table, vals, cb) {
    var val = vals[0];
    var valString = vals[1];

    queryString = "UPDATE "+table+" SET FULL_BRACKET = '"+valString+"' WHERE USER_ID = '"+val+"';"

    connection.query(queryString, vals, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
    });
  } 
//Determine the number of records/restaurants
// numberRestaurant: function(table, vals, cb) {
//    var queryString = "SELECT COUNT(*) AS DATA_LEN, LICENSE_NO FROM (SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE FROM "+table+" WHERE DBA_NAME LIKE '%"+vals+"%' GROUP BY DBA_NAME, RISK, ADDRESS) b;"

//    connection.query(queryString, vals, function(err, result) {
//        if (err) {
//            throw err;
//          }
//          cb(result);
//    });
//  },

//  //Determine the number of filtered records/restaurants
// numberFilterRestaurant: function(table, vals, cb) {
//   var val = vals[0];
//   var zip = vals[1];
//   var queryString = "SELECT COUNT(*) AS DATA_LEN, LICENSE_NO FROM (SELECT LICENSE_NO, DBA_NAME, RISK, ADDRESS, CITY, STATE, ZIP, MAX(INSPECTION_DATE) AS INSPECTION_DATE FROM "+table+" WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+") GROUP BY DBA_NAME, RISK, ADDRESS) b;"
//   connection.query(queryString, vals, function(err, result) {
//       if (err) {
//           throw err;
//         }
//         cb(result);
//   });
// },

// //Select specific restaurant
//   selectRestaurant: function(table, vals, cb) {
    
//     var val = vals[0];
//     var limit = parseInt(vals[1]);
//     var page = parseInt(vals[2]);
//     var queryString = "";
//     var prevPage = page*10-10;
//     var nextPage = 10;
  
//     if (limit === 1) {
//       queryString = "SELECT RES.LICENSE_NO, RES.DBA_NAME, RES.RISK, RES.ADDRESS, RES.INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'red lighten-1' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'black-text yellow accent-4' ELSE 'green darken-1' END END AS RISKCOLOR, RESULTS, VIOLATIONS FROM "+table+" RES INNER JOIN (select LICENSE_NO, MAX((STR_TO_DATE(INSPECTION_DATE, '%m/%d/%Y'))) as MAX_DATE from "+table+" WHERE LICENSE_NO IS NOT NULL group by LICENSE_NO) MXD ON RES.LICENSE_NO = MXD.LICENSE_NO AND STR_TO_DATE(RES.INSPECTION_DATE,'%m/%d/%Y') = MXD.MAX_DATE WHERE DBA_NAME LIKE '%"+val+"%';"
//     } else if (page === 1) {
//       queryString = "SELECT RES.LICENSE_NO, RES.DBA_NAME, RES.RISK, RES.ADDRESS, RES.INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'red lighten-1' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'black-text yellow accent-4' ELSE 'green darken-1' END END AS RISKCOLOR, RESULTS, VIOLATIONS FROM "+table+" RES INNER JOIN (select LICENSE_NO, MAX((STR_TO_DATE(INSPECTION_DATE, '%m/%d/%Y'))) as MAX_DATE from "+table+" WHERE LICENSE_NO IS NOT NULL group by LICENSE_NO) MXD ON RES.LICENSE_NO = MXD.LICENSE_NO AND STR_TO_DATE(RES.INSPECTION_DATE,'%m/%d/%Y') = MXD.MAX_DATE WHERE DBA_NAME LIKE '%"+val+"%' LIMIT 0, 9;"
//     } else {
//       queryString = "SELECT RES.LICENSE_NO, RES.DBA_NAME, RES.RISK, RES.ADDRESS, RES.INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'red lighten-1' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'black-text yellow accent-4' ELSE 'green darken-1' END END AS RISKCOLOR, RESULTS, VIOLATIONS FROM "+table+" RES INNER JOIN (select LICENSE_NO, MAX((STR_TO_DATE(INSPECTION_DATE, '%m/%d/%Y'))) as MAX_DATE from "+table+" WHERE LICENSE_NO IS NOT NULL group by LICENSE_NO) MXD ON RES.LICENSE_NO = MXD.LICENSE_NO AND STR_TO_DATE(RES.INSPECTION_DATE,'%m/%d/%Y') = MXD.MAX_DATE WHERE DBA_NAME LIKE '%"+val+"%' LIMIT "+prevPage+", "+nextPage+";"
//     }   
//     connection.query(queryString, vals, function(err, result) {
//         if (err) {
//             throw err;
//           }
//           cb(result);
//     });
//   },


//   //Select specific restaurant
//   filterRestaurant: function(table, vals, cb) {
    
//     var val = vals[0];
//     var limit = parseInt(vals[1]);
//     var page = parseInt(vals[2]);
//     var zip = vals[3];
//     var queryString = "";
//     var prevPage = page*10-10;
//     var nextPage = 10;
  
//     if (limit === 1) {
//       queryString = "SELECT RES.LICENSE_NO, RES.DBA_NAME, RES.RISK, RES.ADDRESS, RES.INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'red lighten-1' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'black-text yellow accent-4' ELSE 'green darken-1' END END AS RISKCOLOR, RESULTS, VIOLATIONS FROM "+table+" RES INNER JOIN (select LICENSE_NO, MAX((STR_TO_DATE(INSPECTION_DATE, '%m/%d/%Y'))) as MAX_DATE from "+table+" WHERE LICENSE_NO IS NOT NULL group by LICENSE_NO) MXD ON RES.LICENSE_NO = MXD.LICENSE_NO AND STR_TO_DATE(RES.INSPECTION_DATE,'%m/%d/%Y') = MXD.MAX_DATE WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+");"
//     } else if (page === 1) {
//       queryString = "SELECT RES.LICENSE_NO, RES.DBA_NAME, RES.RISK, RES.ADDRESS, RES.INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'red lighten-1' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'black-text yellow accent-4' ELSE 'green darken-1' END END AS RISKCOLOR, RESULTS, VIOLATIONS FROM "+table+" RES INNER JOIN (select LICENSE_NO, MAX((STR_TO_DATE(INSPECTION_DATE, '%m/%d/%Y'))) as MAX_DATE from "+table+" WHERE LICENSE_NO IS NOT NULL group by LICENSE_NO) MXD ON RES.LICENSE_NO = MXD.LICENSE_NO AND STR_TO_DATE(RES.INSPECTION_DATE,'%m/%d/%Y') = MXD.MAX_DATE WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+") LIMIT 0, 9;"
//     } else {
//       queryString = "SELECT RES.LICENSE_NO, RES.DBA_NAME, RES.RISK, RES.ADDRESS, RES.INSPECTION_DATE, CASE WHEN RISK = 'Risk 1 (High)' THEN 'red lighten-1' ELSE CASE WHEN RISK = 'Risk 2 (Medium)' THEN 'black-text yellow accent-4' ELSE 'green darken-1' END END AS RISKCOLOR, RESULTS, VIOLATIONS FROM "+table+" RES INNER JOIN (select LICENSE_NO, MAX((STR_TO_DATE(INSPECTION_DATE, '%m/%d/%Y'))) as MAX_DATE from "+table+" WHERE LICENSE_NO IS NOT NULL group by LICENSE_NO) MXD ON RES.LICENSE_NO = MXD.LICENSE_NO AND STR_TO_DATE(RES.INSPECTION_DATE,'%m/%d/%Y') = MXD.MAX_DATE WHERE DBA_NAME LIKE '%"+val+"%' AND ZIP IN ("+zip+") LIMIT "+prevPage+", "+nextPage+";"
//     } 
//     connection.query(queryString, vals, function(err, result) {
//         if (err) {
//             throw err;
//           }
//           cb(result);
//     });
//   },

//   selectRestaurantByLicense: function(table, vals, cb) {
//     var queryString = "SELECT RES.LICENSE_NO AS LICENSE_NO, RES.DBA_NAME AS DBA_NAME, RES.RISK AS RISK, RES.ADDRESS AS ADDRESS, RES.ZIP AS ZIP, RES.STATE AS STATE, RES.RESULTS AS RESULTS, RES.CITY AS CITY, RES.INSPECTION_DATE, REPLACE(RES.VIOLATIONS,'|','\n') AS VIOLATIONS FROM "+table+" RES INNER JOIN (select LICENSE_NO, MAX((STR_TO_DATE(INSPECTION_DATE, '%m/%d/%Y'))) as MAX_DATE from "+table+" WHERE LICENSE_NO = "+vals+" group by LICENSE_NO) MXD ON RES.LICENSE_NO = MXD.LICENSE_NO AND STR_TO_DATE(RES.INSPECTION_DATE,'%m/%d/%Y') = MXD.MAX_DATE;"
//     connection.query(queryString, vals, function(err, result) {
//         if (err) {
//             throw err;
//           }
//           cb(result);
//     });
//   },

//   // Select the restaurants base on their location (Google Maps)
//   selectRestaurantLocation: function(table, vals, cb) {
//     var queryString = "SELECT DBA_NAME, RISK, LOCATION, LONGITUDE, LATITUDE FROM " +table+ " LIMIT 100;";
//  //   console.log(queryString);
//     connection.query(queryString, vals, function(err, result) {
//         if (err) {
//           throw err;
//           }
//         cb(result);
//         });
//     }
 };

module.exports = orm;