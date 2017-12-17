// server to be run on heroku
// require("dotenv").load();
const express = require('express');
const app = express();
var path = require('path');
var favicon = require('serve-favicon');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./src/app_api/models/db');
var fs = require('fs');


var routesApi = require('./src/app_api/routes/index');

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);