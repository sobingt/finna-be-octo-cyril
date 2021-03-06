var mongo = require('mongodb');
// Mongo setup
var databaseUrl = "mallkhoj"; 
var collections = ["deals"]
var db = require("mongojs").connect(databaseUrl, collections);

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('mallkhoj', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
      console.log("Connected to 'mallkhoj' database");
      //populateDB();
      db.collection('deals', {safe:true}, function(err, collection) {
        if (err) {
            console.log("The 'mallkhoj' collection doesn't exist. Creating it with sample data...");
            //populateDB();
        }
      });
    }
});

db.collection('deals', {safe:true}, function(err, collection) {
  collection.ensureIndex( {name: "text"}, function(err, items) {

  } );
});

// exports.searchDeals = function(patterns, req, res) {
//   db.collection('deals', function(err, collection) {
//     collection.find({index : {$all: patterns }}).toArray(function(err, items) {
//       if( err || !items) {
//         res.header("Access-Control-Allow-Origin", "*");
//         console.log('nothing');
//         res.send([]);
//       } else {
//         res.header("Access-Control-Allow-Origin", "*");
//         console.log(items);
//         res.send(items);
//       }
//     }); 
//   });
// }
function caseInsensitive(keyword){
  // Trim
  keyword = keyword.replace(/^\s+|\s+$/g, '');

  return new RegExp(keyword, 'gi');
}

exports.findDealsByCity = function(req, res) {
  var city = req.params.c;
      s= parseInt(req.params.s);
      t= parseInt(req.params.t);
  if (city && s>=0 && t) {
    console.log(city);
    db.collection('deals', function(err, collection) {
      //collection.aggregate([{$match : {'brand.locations.city': 'mumbai'}}, {$skip : s}, {$limit : t }], function(err, items){
        collection.find({"brand.locations.city": city}).limit(t).skip(s).toArray(function(err, items) {
        console.log(items);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(items);
      });
    });
  }
}

/*
 *
 */
exports.findDealsByCategory = function(req, res) {
  var category = req.params.cat;
    s= parseInt(req.params.s);
    t= parseInt(req.params.t);
  console.log(category);
  db.collection('deals', function(err, collection) {
      collection.find({"categories": category}).limit(t).skip(s).toArray(function(err, item) {
        res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
        res.send(item);
      });
  });
}


exports.findDeals = function(req, res) {
  var q= req.params.q;
      s= parseInt(req.params.s);
      t= parseInt(req.params.t);
  if (q) {
    // Break out all the words
    var words = req.params.q.split(" ");
    var patterns = [];
    // Create case insensitve patterns for each word
    words.forEach(function(item){
      patterns.push(caseInsensitive(item));
    });
  }

  if(t < 0 || typeof t == 'undefined') {
    t = 5;
  }

    //q = q.split(" ");
    //console.log(q);
        // TO-DO
        //filter the search results accorging to the params
  if( q && s>=0 && t ) {
    db.collection('deals', function(err, collection) {
     // collection.find({index : {$all: patterns }}).skip((s-1)*t).limit(t).toArray(function(err, items) {
      collection.aggregate([{$skip : s}, {$match : {index:{$all : patterns}}},{$limit : t }], function(err, items){
        if( err || !items) {
          res.header("Access-Control-Allow-Origin", "*");
          console.log('nothing');
          res.send([]);
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          console.log(items);
          res.send(items);
        }
      });   
    });
  }
  else if (s>=0 && t) {
    console.log('inside s&t');
    db.collection('deals', function(err, collection) {
      collection.aggregate([{$skip: s}, {$limit: t}], function(err, items) {
          console.log(items);
          res.header("Access-Control-Allow-Origin", "*");
          res.send(items);
      });
    });
  }
  // else if (q) {
  //   console.log('inside q');
  //   db.collection('deals', function(err, collection) {
  //     collection.find({index : {$all: patterns }}).toArray(function(err, items) {
  //       if( err || !items) {
  //         res.header("Access-Control-Allow-Origin", "*");
  //         console.log('nothing');
  //         res.send([]);
  //       } else {
  //         res.header("Access-Control-Allow-Origin", "*");
  //         console.log(items);
  //         res.send(items);
  //       }
  //     }); 
  //   });
  // }
  else {
   db.collection('deals', function(err, collection) {
      collection.find().toArray(function(err, items) {
        if( err || !items) {
          res.header("Access-Control-Allow-Origin", "*");
          console.log('nothing');
          res.send([]);
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          console.log(items);
          res.send(items);
        }
      }); 
    });
  }
};

exports.addDeal = function(req, res) {
    // THE EXPECTED POST REQUEST FORMAT.
  //   var deal = {
  //   "name": "xxxxx1",
  //   "brand": {
  //     "id": 1,
  //     "name": "Shoppers Stop",
  //     "location": {
  //       "id": "123121",
  //       "mall_name": "Inorbit Mall",
  //       "area": "",
  //       "latitude": "",
  //       "longitude": ""
  //     }
  //   },
  //   "date": {
  //     "start_date": "23-1-2014",
  //     "end_date": "2-2-2014"
  //   },
  //   "description": "blah blah blah blah",
  //   "code": "UX45FG1",
  //   "small_image_url": "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg",
  //   "big_image_url": "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg",
  //   "status": "active",
  //   "remark": "blah blah blah blah blah",
  //   "category": [
  //     {
  //       "value": "internet"
  //     },
  //     {
  //       "value": "reading"
  //     }
  //   ],
  //   "publisher_id": "1231232",
  //   "created": {
  //       "value":""
  //   }
  // }
    var deal = req.body;
    console.log('Adding deal: ' + JSON.stringify(deal));
    db.collection('deals', function(err, collection) {
        collection.insert(deal, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.header("Access-Control-Allow-Origin", "*");
                res.send(result[0]);
            }
        });
    });
}

/*
 * function for updating a particular deal
 */
 exports.updateDeal = function(req, res) {
    var id = req.params.id;
    console.log(id);
    var deal = req.body;
  //     var deal = {
  //   "name": "A new deal",
  //   "brand": {
  //     "id": 1,
  //     "name": "Shoppers Stop",
  //     "location": {
  //       "id": "123121",
  //       "mall_name": "Infinity Mall",
  //       "area": "andheri",
  //       "latitude": "",
  //       "longitude": ""
  //     }
  //   },
  //   "date": {
  //     "start_date": "23-1-2014",
  //     "end_date": "2-2-2014"
  //   },
  //   "description": "blah blah blah blah",
  //   "code": "UX45FG1",
  //   "small_image_url": "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg",
  //   "big_image_url": "http://www.shoutbackconcepts.com/admin/upload/cms_pages/5138428b6dd4d.jpg",
  //   "status": "active",
  //   "remark": "blah blah blah blah blah",
  //   "category": [
  //     {
  //       "value": "clothes"
  //     },
  //     {
  //       "value": "apparel"
  //     }
  //   ],
  //   "publisher_id": "1231232",
  //   "created": {
  //       "value":""
  //   },
  //   "_id": "52c50739e60905bc0ca4cb8c"
  // }
    delete deal._id;
    console.log('Updating deal: ' + id);
    console.log(JSON.stringify(deal));
    db.collection('deals', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, deal, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating deal: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.header("Access-Control-Allow-Origin", "*");
                res.send(meal);
            }
        });
    });
}
/*
 * Function to find a particular deal by Id
 */
exports.findDealById = function(req, res) {
    console.log("find");
    var id = req.params.id;
    console.log('Retrieving deal: ' + id);
    db.collection('deals', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
             res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
        
            res.send(item);
        });
    });
};

/*
 * Function to delete a particular deal
 */
 exports.deleteDeal = function(req, res) {
    var id = req.params.id;
    console.log('Deleting deal: ' + id);
    db.collection('deals', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');

                res.send(req.body);
            }
        });
    });
}
