// Require packages
var express = require('express');

// Require controllers
var eventController = require('../controllers/eventController');

// Establish 'router'
var router = express.Router();

// Standard routes
router.get('/events', eventController.allEvents);
router.post('/events/populate', eventController.getEvents);

module.exports = router;
