var express = require('express');
var router = express.Router();
const {Pickup,covert_to_array} = require('../models/pickup')
const axios = require('axios');
const  _ = require('lodash')
CircularJSON = require('circular-json'),



router.post('/', async (req, res) => {

    let pickup =  await Pickup.find({countryCode : req.body.country  })

    if(_.isEmpty(pickup) ) {
        pickup = await axios.get('https://api.bring.com/pickuppoint/api/pickuppoint/'+req.body.country+'/all.json')
        pickup = pickup.data.pickupPoint
         await  Pickup.insertMany(pickup)
        console.log('pick up in api : ' + CircularJSON.stringify(pickup)  )
    }

  res.render('index', { title: 'Pick-up app' , markers : CircularJSON.stringify( pickup )  } );
});

module.exports = router;
