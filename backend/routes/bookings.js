// routes/bookings.js
const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookings');
const validateDateFormat = require('../middleware/validateDateFormat');
const { validateBookingDetails } = require('../middleware/bookingValidator');

// POST / - Create a new booking (remove '/api/bookings')
router.post('/', validateDateFormat, validateBookingDetails, createBooking);

module.exports = router;