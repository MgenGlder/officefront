// server to be run on heroku
// require("dotenv").load();
const express = require('express');
const app = express();
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

app.use(express.static(__dirname + '/dist'));
app.use("/api", routesApi);

app.listen(process.env.PORT || 8080);