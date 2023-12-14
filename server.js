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

var api = require(('./ops-genie-api'))

// web service per team
app.get('/helpdesk', function (req, res) {
    api.getTeamOnCallNumber("Help Desk", (phoneNumber)=> {
        res.send(phoneNumber)
    })
});

app.get('/network', function (req, res) {
    api.getTeamOnCallNumber("Network", (phoneNumber)=> {
        res.send(phoneNumber)
    })
});

app.get('/ibmi', function (req, res) {
    api.getTeamOnCallNumber("IBM i", (phoneNumber)=> {
        res.send(phoneNumber)
    })
});

app.get('/windows', function (req, res) {
    api.getTeamOnCallNumber("Windows", (phoneNumber)=> {
        res.send(phoneNumber)
    })
});

app.get('/sql', function (req, res) {
    api.getTeamOnCallNumber("SQL", (phoneNumber)=> {
        res.send(phoneNumber)
    })
});

app.get('/sharepoint', function (req, res) {
    api.getTeamOnCallNumber("SharePoint", (phoneNumber)=> {
        res.send(phoneNumber)
    })
});

// web service for testing
app.get('/test', function (req, res) {
    //let result = "13109228402"  //Carson's phone number
    let result = "12108708381"  //Lance's phone number
    res.send(result)
});

app.set('port', process.env.PORT || config.server.port);

var server = app.listen(app.get('port'), function () {
    console.log("Listening on port: " + app.get('port'));
    console.log("Server start-up completed");
});