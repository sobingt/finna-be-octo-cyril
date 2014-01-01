var express = require('express'),
stylus = require('stylus'),
routes    = require('./routes/'),
http = require('http');


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

var deal = function(req, res){
var deals={
      "smallImageUrls": [
        "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg"
      ],
      "location": [
        "borivali",
        "khar",
        "andheri",
        "goa",
        "sad",
        "tx"
      ],
      "flavors": {
        "sour": 0.5,
        "salty": 0.16666666666666666,
        "sweet": 0.3333333333333333,
        "meaty": 0.16666666666666666,
        "bitter": 0.3333333333333333
      },
      "imageUrlsBySize": {
        "90": "http://lh6.ggpht.com/Bt2_bX-hr4h0JTfoMc8sM2dj3YYV4Nk-Pc8wuIDHdFz5XpnfpZ_hU-GZ6uqoffEhBkblZCtXhIqDUsMcacCWqBQ=s90-c"
      },
      "attributes": {},
      "totalTimeInSeconds": 2100,
      "rating": 4,
      "dealName": "Deal name",
      "sourceDisplayName": "Vinnet",
      "id": "deal-at-borivali-343"
    };

res.type('application/json');
 res.send(deals,200);
};

var deals = function(req, res){
var deals={
  "attribution": {
    "html": "Deal search powered by <a href='http://www.mallkhoj.com/deals'><img alt='Mallkhoj' src='http://static.mallkhoj.com/api-logo.png'/></a>",
    "url": "http://www.mallkhoj.com/deals/",
    "text": "Deal search powered by Mallkhoj",
    "logo": "http://static.mallkhoj.com/api-logo.png"
  },
  "totalMatchCount": 158787,
  "facetCounts": {},
  "matches": [
    {
      "smallImageUrls": [
        "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg"
      ],
      "location": [
        "borivali",
        "khar",
        "andheri",
        "goa",
        "sad",
        "tx"
      ],
      "flavors": null,
      "imageUrlsBySize": {
        "90": "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg"
      },
      "attributes": {},
      "totalTimeInSeconds": 3300,
      "rating": 5,
      "dealName": "dfsdfsdf",
      "sourceDisplayName": "Vinnet",
      "id": "deal-at-borivali-34"
    },
    {
      "smallImageUrls": [
        "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg"
      ],
      "location": [
        "borivali",
        "khar",
        "andheri",
        "goa",
        "sad",
        "tx"
      ],
      "flavors": {
        "sour": 0.5,
        "salty": 0.16666666666666666,
        "sweet": 0.3333333333333333,
        "meaty": 0.16666666666666666,
        "bitter": 0.3333333333333333
      },
      "imageUrlsBySize": {
        "90": "http://lh6.ggpht.com/Bt2_bX-hr4h0JTfoMc8sM2dj3YYV4Nk-Pc8wuIDHdFz5XpnfpZ_hU-GZ6uqoffEhBkblZCtXhIqDUsMcacCWqBQ=s90-c"
      },
      "attributes": {},
      "totalTimeInSeconds": 2100,
      "rating": 4,
      "dealName": "Deal name",
      "sourceDisplayName": "Vinnet",
      "id": "deal-at-borivali-343"
    },
    {
      "smallImageUrls": [
        "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg"
      ],
      "location": [
        "borivali",
        "khar",
        "andheri",
        "goa",
        "sad",
        "tx"
      ],
      "flavors": null,
      "imageUrlsBySize": {
        "90": "http://lh5.ggpht.com/AB6krZtKHMLlWHCapssi2SRN6dELHuH6VhLwWyW75Q_S8L_WmCvqSB1EsaLhkIeSfra8eE2dHnS1Pb93i51U=s90-c"
      },
      "attributes": {},
      "totalTimeInSeconds": 4200,
      "rating": 5,
      "dealName": "Deal name in XXX ",
      "sourceDisplayName": "Sobin",
      "id": "deal-at-borivali-3444"
    },
    {
      "smallImageUrls": [
        "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg"
      ],
      "location": [
        "borivali",
        "khar",
        "andheri",
        "goa",
        "sad",
        "tx"
      ],
      "flavors": {
        "sour": 1,
        "salty": 0.16666666666666666,
        "sweet": 0.5,
        "meaty": 0.8333333333333334,
        "bitter": 0.3333333333333333
      },
      "imageUrlsBySize": {
        "90": "http://lh4.ggpht.com/ZXiwjS55Zk7oBu6GWaVr0HAqIPKumXwBfGtzsCWEFdrJSOXiCcC-I3TpUwrXBnP_DPNuBm-ib-4-3aXbs4mfXA=s90-c"
      },
      "attributes": {},
      "totalTimeInSeconds": 1500,
      "rating": 5,
      "dealName": "Deal Namefgdsgdsf",
      "sourceDisplayName": "sobin",
      "id": "deal-at-borivali-3444"
    },
    {
      "smallImageUrls": [
        "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg"
      ],
      "location": [
        "borivali",
        "khar",
        "andheri",
        "goa",
        "sad",
        "tx"
      ],
      "flavors": null,
      "imageUrlsBySize": {
        "90": "http://lh5.ggpht.com/kPLmetfYY-M1d46yd_qvGw2akwfaR26-StwKPeY_oLYwjoJZLaj8TSitWtsrHBT_pWlPopKY5EyUfWmoxC8Pvw=s90-c"
      },
      "attributes": {
        "course": [
          "Desserts"
        ]
      },
      "totalTimeInSeconds": 2400,
      "rating": 4,
      "dealName": "fadsjfhdsajfdshkj",
      "sourceDisplayName": "Sobin",
      "id": "deal-at-borivali-3422"
    }
  ],
  "criteria": {
    "excludedIngredients": null,
    "allowedIngredients": null,
    "terms": null,
    "requirePictures": true
  }
};
res.type('application/json');
 res.send(deals,200);
};

//////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////

app.get('/deals/q=:q/s=:s/t=:t', deals);

app.get('/deals/s=:s/t=:t', deals);

app.get('/deals/q=:q', deals);

app.get('/deals/:id', deal);

app.get('/deals', deals);

//////////////////////////////////////////////////
// Listen
//////////////////////////////////////////////////

app.listen(port, function() {
        console.log('Mallkhoj\'s app listening on port ' + port);
});