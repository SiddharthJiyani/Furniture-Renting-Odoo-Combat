const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

// Define the routes
router.post('/api/bookings', bookingController.createBooking);

// Corrected GET route for user bookings
router.get('/api/bookings/user/:userId', async (req, res) => {
    try {
        const bookings = await bookingController.getUserBookings(req, res); // Invoke the function correctly
        res.json(bookings); // Assuming getUserBookings sends JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
    }
});

router.get('/api/bookings/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
      const bookingDetails = await bookingController.getBookingDetails(bookingId);
      res.json(bookingDetails);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching booking details', error: error.message });
    }
  });
  router.patch('/api/bookings/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { status } = req.body; // Assuming the new status is sent in the request body
      const updatedBooking = await bookingController.updateBookingStatus(bookingId, status);
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking status', error: error.message });
    }
  });
  
  router.delete('/api/bookings/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
      const result = await bookingController.cancelBooking(bookingId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error canceling booking', error: error.message });
    }
  });
module.exports = router;
