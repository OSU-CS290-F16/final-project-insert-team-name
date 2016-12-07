var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();
var dogPix = require('./dog-pix');
var port = process.env.PORT || 3000;
var fs = require('fs')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Render the index page for the root URL path ('/').
app.get('/', function (req, res) {
  res.render('index-page', {
      dogPix: dogPix
    });
});

app.get('/pix/:doggo', function(req,res, next){
  var doggo = dogPix[req.params.doggo];

  if(doggo){
    res.render('large-pix',{
      doge: doggo
    });
}
    else{
      next();
    }
});

app.get('/random', function(req,res, next){
  var rand = Math.floor(Math.random() * Object.keys(dogPix).length);
  var doggo = dogPix[rand+1];

  if(doggo){
    res.render('large-pix',{
      doge: doggo
    });
}
    else{
      next();
    }
});

app.post('/pix/new_photo', function(req,res,next){
  var newkey = Object.keys(dogPix).length+1;
  var rate = req.body.rate+'/10';
  var newdoggo = {
    url:req.body.url,
    comment:req.body.comment,
    rate:rate
  };
    dogPix[newkey]=newdoggo;
    fs.openSync('dog-pix.json','w');
    fs.writeFileSync('dog-pix.json',JSON.stringify(dogPix));
    res.status(200).send();
});
app.get('/dogPix', function (req,res) {
  var collection = mongoDB.collection('dogPix');
  collection.find({}).toArray(function (err,dogPix){
    if (err) {
      console.log("== Error fetching dogPix from database:", err);
      res.status(500).send("Error fetching dogPix" + err);
    }
    else{
      res.render('index-page',{
        dogPix: dogPix
      });
    }
  });
});



app.listen(port, function () {
  console.log("== Listening on port", port);
});
