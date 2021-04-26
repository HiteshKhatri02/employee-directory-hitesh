var express = require('express');
var http = require('http');
var path = require('path');
const db = require('./queries');
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.post('/employee', db.createEmployee);
app.post('/view', db.viewEmployee);
app.post('/deleteEmployee', db.deleteEmployee);


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './public/form.html'));
});

server.listen(port, function() {
	console.log('server is listening on port: 4000');
});
