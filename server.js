// server to be run on heroku
// require("dotenv").load();
const express = require('express');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // res.header('if-none-match','no-match-for-this'); // was a potential fix for 304s on get requests
    next();
});
app.disable('etag'); // fix for 304s on get requests
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
require('./src/app_api/models/db');
var routesApi = require('./src/app_api/routes/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", routesApi);

app.use(express.static(__dirname + '/dist'));


app.listen(process.env.PORT || 8080);