/******************************************************************************/
/** Filename: Server.js                                                      **/
/** Purpose: Provide RESTful webservice wrapper for OpsGenie caller rotation **/
/******************************************************************************/
// This is a node express application
var express = require('express');
var app = express();
console.log("Starting server...");

// Load server configuration settings based on args from command line
var config = require('./config');
console.log("Configuration loaded");

// Test web services to see if JSON or String work best for return values
app.get('/json', function (req, res) {
    let result = {"voice": "1-3109228402"}
    res.send(result)
});

app.get('/text', function (req, res) {
    let result = "1-3109228402"
    res.send(result)
});

app.set('port', process.env.PORT || config.server.port);

var server = app.listen(app.get('port'), function () {
    console.log("Listening on port: " + app.get('port'));
    console.log("Server start-up completed");
});