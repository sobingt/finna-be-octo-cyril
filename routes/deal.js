var mongo = require('mongodb');

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

exports.findDeals = function(req, res) {
    var q= req.params.q;
        s= req.params.s;
        t= req.params.t;

        if(t < 0 || typeof t == 'undefined') {
      t = 5;
    }
    //q = q.split(" ");
    //console.log(q);
        // TO-DO
        //filter the search results accorging to the params
    if( q && s && t ) {
      db.collection('deals', function(err, collection) {
          collection.find().toArray(function(err, items) {
              console.log(items);
              res.header("Access-Control-Allow-Origin", "*");
              res.send(items);
          });
      });
    }
    else if (s && t) {
      db.collection('deals', function(err, collection) {
        collection.find().limit(t).toArray(function(err, items) {
            console.log(items);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(items);
        });
      });
    }
    else if (q) {
      console.log('inside q');
      db.collection('deals', function(err, collection) {
        var w = '/^'+q+'$';
        collection.find().limit(t).toArray(function(err, items) {
            console.log(items);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(items);
        });
      });
    }
    else {
     db.collection('deals', function(err, collection) {
        var w = '/^'+q+'$';
        collection.find().limit(t).toArray(function(err, items) {
            console.log(items);
            res.header("Access-Control-Allow-Origin", "*");
            res.send(items);
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
