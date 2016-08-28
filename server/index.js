var express = require('express');
var path = require('path');
var app = express();
var staticPath = path.join(__dirname, '/../dist');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(staticPath));
app.use(function (req, res) {
  res.status(404);
  res.send('File not found!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});