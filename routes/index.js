//TODO  have to work on ACL
exports.index = function(req, res){
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
        "http://mallkhoj-dealimages-compressed.s3.amazonaws.com/Basic-mac-n-cheese-deal-306707-269988.s.jpg"
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
        "90": "http://lh3.ggpht.com/nx2AAz75Bv4g4GnAVqiSPWecyROEOv4J9X-zLdPZ_QJck42LQezwdlyqaxjkO8AcVwJnW7jhKJFLdST4zvHn=s90-c"
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
        "http://mallkhoj-dealimages-compressed.s3.amazonaws.com/Roasted-Red-Potatoes-Martha-Stewart-107311.s.png"
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
        "http://mallkhoj-dealimages-compressed.s3.amazonaws.com/Kansas-city-barbecue-sauce-deal-306052-269383.s.jpg"
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
        "http://mallkhoj-dealimages-compressed.s3.amazonaws.com/Pasta-with-garlicky-broccoli-rabe-305651-270310.s.jpg"
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
        "http://mallkhoj-dealimages-compressed.s3.amazonaws.com/Peanut-Butter_Chocolate-Pie-Martha-Stewart-111535.s.png"
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