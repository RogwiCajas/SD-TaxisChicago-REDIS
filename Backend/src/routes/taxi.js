// Creacion de rutas para las vistas
const express = require("express");
const taxiSchema = require("../models/taxi");
const router = express.Router();
const fs = require('fs')
const path = require('path')

const txt = fs.readFileSync(path.resolve(__dirname, 'result.txt') , 'utf8')

//Ruta Resultados de MapReduce
router.get('/taxis/mapreduce/resultados', (req, res) => {
    let arreglo = txt.split('\r\n');
    let resultados =[];
    for (linea in arreglo){
        let values = arreglo[linea].split('\t');
        console.log(values);
        resultados.push({
            compania:values[0],
            tripTotal: values[1],
        })
    }
    res.send(resultados);
});

// Ruta y operacion CREATE
router.post('/taxis', (req, res) => {
    const taxi = taxiSchema(req.body);
    taxi
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Ruta y operacion READ
router.get('/taxis/:id', (req, res) => {
    const { id } = req.params;
    taxiSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Ruta y operacion UPDATE
router.put('/taxis/:id', (req, res) => {
    const { id } = req.params;
    const { unique_key, taxi_id, trip_start_timestamp, trip_end_timestamp, trip_seconds, trip_miles, pickup_census_tract, dropoff_census_tract, pickup_community_area, dropoff_community_area, fare, tips, tolls, extras, trip_total, payment_type, company, pickup_latitude, pickup_longitude, pickup_location, dropoff_latitude, dropoff_longitude, dropoff_location } = req.body;
    taxiSchema
        .updateOne({ _id: id }, { $set: {unique_key, taxi_id, trip_start_timestamp, trip_end_timestamp, trip_seconds, trip_miles, pickup_census_tract, dropoff_census_tract, pickup_community_area, dropoff_community_area, fare, tips, tolls, extras, trip_total, payment_type, company, pickup_latitude, pickup_longitude, pickup_location, dropoff_latitude, dropoff_longitude, dropoff_location} })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Ruta y operacion DELETE
router.delete('/taxis/:id', (req, res) => {
    const { id } = req.params;
    taxiSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


module.exports = router;