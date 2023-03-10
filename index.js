var express = require('express');
var homeRoute = require('./routes/home');
var mongoose = require('mongoose');
var app = express();
var bodyparser = require('body-parser');

var port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://admin:admin@assignmentcluster.l8ppzrb.mongodb.net/test');
var db = mongoose.connection;
db.on('error', ()=>console.log("Something wrong"));
db.once('open', ()=>{
    console.log("DB connected");
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use('/', homeRoute);

app.listen(port, function() {
    console.log("App is running on port " + port);
});