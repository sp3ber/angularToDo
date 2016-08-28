var express = require('express');
var path = require('path');
var app = express();
var staticPath = path.join(__dirname, '/../dist');

var port = 80;

app.use(express.static(staticPath));
app.use(function (req, res) {
  res.status(404);
  res.send('File not found!');
});

app.listen(port, function () {
  console.log('App started on port ' + port);
});