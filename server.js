var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var dogPix = require('./dog-pix');
var port = process.env.PORT || 3000;
var fs = require('fs')
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDB;

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
  console.log(req.body.url);
  console.log(req.body.comment);
  var newdoggo =JSON.stringify({
    url:req.body.url,
    comment:req.body.comment,
    rate:req.body.rate
  });
    fs.openSync('dog-pix.json','a');
    fs.writeFileSync('dog-pix.json',newdoggo);
    dogPix= require('./dog-pix');
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
