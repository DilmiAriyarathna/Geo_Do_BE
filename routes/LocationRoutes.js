const express = require('express');
const router = express.Router();
const locationController = require('../controllers/LocationController');

router.post('/location', locationController.addLocation);
router.get('/locations', locationController.getAllLocations); 
router.delete('/locations/:id', locationController.deleteLocation);
router.get('/locations/by-id/:id', locationController.getLocationById);
router.get('/locations/by-name/:name', locationController.getLocationByName);

module.exports = router;
