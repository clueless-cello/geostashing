const express = require('express');
const router = new express.Router();

const locations = require('../controllers/location');
const user = require('../controllers/user');

router.get('/api/locations', locations.getAll);
router.post('/api/locations', locations.addOne);
router.delete('/api/locations/:name', locations.deleteOne);

router.get('/api/users', user.getAll);
router.get('/api/users/:name', user.getOne);
router.post('/api/users', user.addOne);
router.delete('/api/users/:name', user.deleteOne);

module.exports = router;
