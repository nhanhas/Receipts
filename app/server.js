// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // define our app using body-parser

var mongoose   = require('mongoose');       // define our app using mongoose
mongoose.connect('mongodb://localhost:27017/receiptsDB'); // connect to our database


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port

//All API Routes goes Here...
var servicesConfig = require('./BusinessLayer/ServicesConfig');
app.use(servicesConfig);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is now live on port: ' + port);




module.exports = app;