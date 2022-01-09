// Creacion de rutas para las vistas
const express = require("express");
const taxiSchema = require("../models/taxi");
const router = express.Router();
const fs = require('fs')
const path = require('path')

const txt = fs.readFileSync(path.resolve(__dirname, 'result.txt') , 'utf8')

var redis = require('redis');
var client = redis.createClient(); //creates a new client
// client.on('connect', function() {
//     console.log('connecteddddddddddddddddddddddddd*****');
// });
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
// client.set('key', 'value');
// client.get('foo').then(console.log("SIIIIIIII"));

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
    client.get(id).then(resp => {
        if(resp==null){
            console.log(" NULOOOOOOOOOO")
            taxiSchema
            .findById(id)
            .then((data) => {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                console.log(data)
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")            
                client.set(id,JSON.stringify(data),(err,reply)=>{
                    if(err) console.error(err)
                    console.log("RESPUESTAAAAA "+reply)
                });            
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                res.json(data)
            })
            .catch((error) => res.json({ message: error }));    
        }
        else{
            console.log(resp+ "  BBBBBBBB")
            res.json(JSON.parse(resp))
        }
    })           

    // const { id } = req.params;
    // taxiSchema
    //     .findById(id)
    //     .then((data) => {
    //         console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    //         console.log(data)
    //         console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")            
    //         client.set('taxi',JSON.stringify(data),(err,reply)=>{
    //             if(err) console.error(err)
    //             console.log("RESPUESTAAAAA "+reply)
    //         });            
    //         console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    //         // client.get('taxi').then(resp => 
    //         //     console.log(resp+ " BBBBB")
                
    //         // )           


    //         res.json(data)
    //     })
    //     .catch((error) => res.json({ message: error }));
});

// router.get('/taxis/:id', async (req, res) => {
//     const { id } = req.params;
//     client.get(id, async (err, reply) => {
//         console.log("DENTRO DEEEEEL")
//         if(reply){
//             console.log("en reply")
//             return res.json(JSON.parse(reply));
//         }
//         taxiSchema        
//         .findById(id)
//         .then((data) => {
//             client.set(id, JSON.stringify(data), (err, reply) => {
//                 console.log("sin reply")
//                 res.json(data)
//             });
//         })
//         .catch((error) => res.json({ message: error }));
//     })
// });



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