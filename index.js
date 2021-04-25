var express = require('express');
var http = require('http');
var path = require('path');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './public/form.html'));
});

server.listen(port, function() {
	console.log('server is listening on port: 3000');
});
