// Creacion del modelo de la base
const mongoose = require('mongoose');

const taxiSchema = mongoose.Schema({
    unique_key: {
        type: String,
        required: true
    },
    taxi_id: {
        type: String,
        required: true
    },
    trip_start_timestamp: {
        type: String
    },
    trip_end_timestamp: {
        type: String
    },
    trip_seconds: {
        type: Number
    },
    trip_miles: {
        type: Number
    },
    pickup_census_tract: {
        type: Number
    },
    dropoff_census_tract: {
        type: Number
    },
    pickup_community_area: {
        type: Number
    },
    dropoff_community_area: {
        type: Number
    },
    fare: {
        type: Number
    },
    tips: {
        type: Number
    },
    tolls: {
        type: Number
    },
    extras: {
        type: Number
    },
    trip_total: {
        type: Number
    },
    payment_type: {
        type: String
    },
    company: {
        type: String
    },
    pickup_latitude: {
        type: Number
    },
    pickup_longitude: {
        type: Number
    },
    pickup_location: {
        type: String
    },
    dropoff_latitude: {
        type: Number
    },
    dropoff_longitude: {
        type: Number
    },
    dropoff_location: {
        type: String
    }
});

module.exports = mongoose.model('Taxi', taxiSchema);