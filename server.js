var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var dogPix = require('./dog-pix');
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// Render the index page for the root URL path ('/').
app.get('/', function (req, res) {
  res.render('index-page', {
      dogPix: dogPix
    });
});



app.listen(port, function () {
  console.log("== Listening on port", port);
});
