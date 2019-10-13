const mongoose = require('mongoose');
const  _ = require('lodash')

const pickupSchema = new mongoose.Schema({
    id: String,
    unitId: String,
    name: String,
    address: String,
    postalCode: String,
    city: String,
    countryCode: String,
    visitingAddress: String,
    visitingPostalCode: String,
    visitingCity: String,
    openingHoursNorwegian: String,
    openingHoursEnglish: String,
    openingHoursFinnish: String,
    openingHoursDanish: String,
    openingHoursSwedish: String,
    latitude: String,
    longitude: String,
    utmX: String,
    utmY: String,
    googleMapsLink: String,
    distanceInKm: String,
    distanceType: String,
    type: String,
    additionalServiceCode: String,
    routeMapsLink: String,
    capabilities: []
});


const Pickup = mongoose.model('Pickup', pickupSchema);

function covert_to_array ( object) {
    var array =[] ;
    for (let i=0 ; i<object.length  ; i++)  {
        array.push(object[i])
    }
    return array
}


exports.Pickup = Pickup;
exports.covert_to_array = covert_to_array