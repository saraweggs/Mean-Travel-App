// DEPENDENCIES
const express = require('express');
const router = express.Router();
const Travels = require('../models/travels.js');

// ROUTES

router.get('/', (req,res) => {
    Travels.find({}, (error, foundTravels) => {
        res.json(foundTravels);
    });
});

router.delete('/:id', (req, res) => {
    Travels.findByIdAndDelete(req.params.id, (err, deletedTravel) => {
        res.json(deletedTravel);
    });
});

router.post('/', (req, res) => {
    Travels.create(req.body, (err, createdTravel) => {
        res.json(createdTravel);
    });
});

router.put('/:id', (req, res) => {
    Travels.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTravel) => {
        res.json(updatedTravel);
    });
});

module.exports = router;
