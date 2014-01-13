var express = require('express')
,   deal = require('./routes/deal.js')
,   dealtest = require('./routes/dealtest.js')
,   stylus = require('stylus')
,   routes    = require('./routes/')
,   http = require('http');

var app = express();
var port = process.env.PORT || 3000;

app.use(stylus.middleware(
{
    src: __dirname + '/views',
    dest: __dirname + '/public'
}));

app.use(express.static(__dirname + '/public'));

 // Mongo setup
var databaseUrl = "mallkhoj"; 
var collections = ["deals"]
var db = require("mongojs").connect(databaseUrl, collections);

var sendBack = function (req, res, error, response, json) {
    if (error) {
        console.error(error);
    } else if (response === 200) {
        res.type('application/json');
        res.send(200, json);
    } else {
        console.log(response);
    }
};

// Import the data
require('./import')(db);

// Facilitates queries on mongodb
function caseInsensitive(keyword){
  // Trim
  keyword = keyword.replace(/^\s+|\s+$/g, '');

  return new RegExp(keyword, 'gi');
}

var getByQuery = function (req, res) {
    console.log('getByQuery: /deals/q=' + req.params.q + '/s=' +
                req.params.s + '/t=' + req.params.t);

};

var getById = function (req, res) {
    console.log('getById: /deals/' + req.params.id);
};

//
app.get('/q/:term', function(req, res){

  var term = req.params.term;

  // Break out all the words
  var words = req.params.term.split(" ");
  var patterns = [];

  // Create case insensitve patterns for each word
  words.forEach(function(item){
    patterns.push(caseInsensitive(item));
  });

  db.deals.find({index : {$all: patterns }}, function(err, results) {
    if( err || !results) {
      console.log('nothing');
      res.json([]);
    } else {
      console.log(results);
      res.json(results);
    }
  });  
  

});


// Routes
app.get('/deals/q=:q/s=:s/t=:t', deal.findDeals);

app.get('/deals/s=:s/t=:t', deal.findDeals);

app.get('/deals/q=:q', deal.findDeals);
app.get('/deals', deal.findDeals);

//app.get('/deals/:id', deal);

//app.get('/deals', dealdb.allDeals);
app.post('/deals', deal.addDeal);
app.get('/deals/:id', deal.findDealById);
app.put('/deals/:id', deal.updateDeal);
app.delete('/deals/:id', deal.deleteDeal);

// Listen
app.listen(port, function() {
        console.log('Mallkhoj\'s app listening on port ' + port);
});