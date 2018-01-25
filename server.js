var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/public"));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(bodyParser.json());

app.listen(8088, function () {
    console.log("Server:8088");
});
