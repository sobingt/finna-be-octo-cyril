var express = require('express')
,   dealdb = require('./routes/dealdb.js')
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

var getByQuery = function (req, res) {
    console.log('getByQuery: /deals/q=' + req.params.q + '/s=' +
                req.params.s + '/t=' + req.params.t);

};

var getById = function (req, res) {
    console.log('getById: /deals/' + req.params.id);
};

var deal = {
    "name": "xxxxx",
    "brand": {
      "id": 1,
      "name": "Shoppers Stop",
      "location": {
        "id": "123121",
        "mall_name": "Inorbit Mall",
        "area": "",
        "latitude": "",
        "longitude": ""
      }
    },
    "date": {
      "start_date": "23-1-2014",
      "end_date": "2-2-2014"
    },
    "description": "blah blah blah blah",
    "code": "UX45FG1",
    "small_image_url": "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg",
    "big_image_url": "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg",
    "status": "active",
    "remark": "blah blah blah blah blah",
    "category": [
      {
        "value": "internet"
      },
      {
        "value": "reading"
      }
    ],
    "publisher_id": "1231232",
    "created": {}
  }
//////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////

//app.get('/deals/q=:q/s=:s/t=:t', deals);

//app.get('/deals/s=:s/t=:t', deals);

//app.get('/deals/q=:q', deals);

//app.get('/deals/:id', deal);

app.get('/deals', dealdb.allDeals);
app.post('/deals', dealdb.addDeal);
app.get('/deals/:id', dealdb.findDealById);
app.put('/deals/:id', dealdb.updateDeal);
app.delete('/deals/:id', dealdb.deleteDeal);

//////////////////////////////////////////////////
// Listen
//////////////////////////////////////////////////

app.listen(port, function() {
        console.log('Mallkhoj\'s app listening on port ' + port);
});