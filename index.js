const express = require('express');
const homeRoute = require('./routes/home');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');

const port = process.env.port || 3000;
mongoose.connect('mongodb+srv://admin:admin@assignmentcluster.l8ppzrb.mongodb.net/test');
const db = mongoose.connection;
db.on('error', ()=>console.log("Something wrong"));
db.once('open', ()=>{
    console.log("DB connected");
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use('/', homeRoute);

app.listen(port);