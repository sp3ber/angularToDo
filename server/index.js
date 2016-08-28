var express = require('express');
var path = require('path');
var app = express();
var staticPath = path.join(__dirname, '/../dist');

app.use(express.static(staticPath));
app.use(function (req, res) {
  res.status(404);
  res.send('File not found!');
});

app.listen(80, function () {
  console.log('App started on port 3000');
});