var express    = require('express');        // call express
var app        = express();                 // define our app using express


//All Modules API loaded here
var receipt = require('./Receipt/receiptAPI');


//Register all API-Module Routes here
app.use('/api', receipt); //This is our route middleware



module.exports = app;