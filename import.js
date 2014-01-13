
module.exports = function (db) {

  var deals  =[
  {
    "_id": "usd49-for-a22-point-winter-furnace-inspection-and-cleaning",
    "name": "$49 for a 22-Point Winter Furnace Inspection and Cleaning",
    "brand": {
      "id": 1,
      "name": "Shoppers Stop",
      "location": {
        "id": "123121",
        "mall_name": "Inorbit Mall",
        "area": "Malad",
        "latitude": 19.173064,
        "longitude": 72.835616
      }
    },
    "description": "<ul class=\"storefront\" style=\"list-style-type:disc\">\n<li>$49 for a 22-point furnace inspection and cleaning</li>\n<li>Valid for gas furnaces and heat pump</li>\n<li>Valid for one furnace only; purchase additional deals for multiple units</li>\n<li>Cleaning and checking gas burners, pilot assembly, thermocouple, burner flame (adjusting gas pressure as needed), and heat exchanger</li>\n<li>Inspecting flue venting, fan control, limit safety device, electrical wiring, blower speed, amp ddeals, thermostat, heat anticipator setting (from manual override), and belt tension (adjusting tension as needed)</li>\n<li>Changing standard disposable filters (customer provided)</li>\n<li>Confirming overall safe operation</li></ul>",
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
    "created": {
      "publisher_id": "1231232",
      "start_date": "23-1-2014",
      "end_date": "2-2-2014"
    }
  },
  {
    "_id": "50-off-on-puma-apparels",
    "name": "50% off on PUMA Apparels",
    "brand": {
      "id": 1,
      "name": "Puma",
      "location": {
        "id": "123121",
        "mall_name": "Inorbit Mall",
        "area": "malad",
        "latitude": "19.172505000000000000",
        "longitude": "72.836174000000030000"
      }
    },
    "description": "<ul class=\"storefront\" style=\"list-style-type:disc\">\n<li>$49 for a 22-point furnace inspection and cleaning</li>\n<li>Valid for gas furnaces and heat pump</li>\n<li>Valid for one furnace only; purchase additional deals for multiple units</li>\n<li>Cleaning and checking gas burners, pilot assembly, thermocouple, burner flame (adjusting gas pressure as needed), and heat exchanger</li>\n<li>Inspecting flue venting, fan control, limit safety device, electrical wiring, blower speed, amp ddeals, thermostat, heat anticipator setting (from manual override), and belt tension (adjusting tension as needed)</li>\n<li>Changing standard disposable filters (customer provided)</li>\n<li>Confirming overall safe operation</li></ul>",
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
    "created": {
      "publisher_id": "1231233",
      "start_date": "23-1-2014",
      "end_date": "2-2-2014"
    }
  }
];
 

  // Iterate over deals data objects
deals.forEach(function(item){

    var index = "";

    for (var key in item) {
       if (item.hasOwnProperty(key)) {
            var obj = item[key];
            index += item[key];
       }
    }
    item.index = index;

  });

  // Clear any existing data
  db.deals.drop();
  console.log('import', deals);
  db.deals.insert(deals);

}