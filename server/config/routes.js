const express = require('express');
const router = new express.Router();

const locations = require('../controllers/location');
const user = require('../controllers/user');
const product = require('../controllers/product');
const image = require('../controllers/image');

router.get('/api/locations', locations.getAll);
router.post('/api/locations', locations.addOne);
router.delete('/api/locations/:name', locations.deleteOne);
router.post('/api/locations/suggestions/', locations.suggestions);
router.post('/api/locations/details/', locations.details);

// router.post('/api/users', user.getAll);
router.post('/api/users/:name', user.getOne);
router.post('/api/users', user.addOne);
router.get('/api/users/signOut', user.signOut);
// router.delete('/api/users/:name', user.deleteOne);

router.get('/api/products', product.getAll);
router.post('/api/products', product.addOne);

router.post('/api/images', image.addOne);

//router.get('*', send index.html)
//put this at the end to handle error stuff
//you want to handle errors on the front end
//what ever you get to the backend just ship back index.html

module.exports = router;
