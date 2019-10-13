var express = require('express');
var router = express.Router();
const {Pickup,covert_to_array} = require('../models/pickup')
const axios = require('axios');
const  _ = require('lodash')
CircularJSON = require('circular-json'),

    // to optimize the user charge i created a db in my case mongodb where i store pickup points of my users in it
    // so in the future if one of my users want to search i don't have to call the api again
    // but in same time i don't want to store all the data of the api in my db cuz its too big
    // so at least if the api is down or so .. , my app can serve my users (users that already bought before)
router.post('/', async (req, res) => {
    // in here i used the api of search by country cuz truly i didn't understand
    // how the post code works exactly (when you query 1123 you get a list but non of the points has post code 1123 !!)

   // 1)- search in the database first
    let pickup =  await Pickup.find({countryCode : req.body.country })

    // 2)- if there's not ,  query the api and store the result in the db
    if(_.isEmpty(pickup) ) {
        pickup = await axios.get('https://api.bring.com/pickuppoint/api/pickuppoint/'+req.body.country+'/all.json')
        pickup = pickup.data.pickupPoint
         await  Pickup.insertMany(pickup)
    }
  res.render('index', { title: 'Pick-up app' , markers : CircularJSON.stringify( pickup )});
});

module.exports = router;
