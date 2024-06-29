// middleware/bookingValidator.js

const Booking = require('../models/Booking');

// Middleware function to validate booking details and check availability
const validateBookingDetails = async (req, res, next) => {
    const { furnitureId, startDate, endDate } = req.body;

    try {
        // Check if startDate and endDate are valid dates
        const isValidDate = (dateStr) => {
            return !isNaN(Date.parse(dateStr));
        };

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD format.' });
        }

        // Check if startDate is before endDate
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start >= end) {
            return res.status(400).json({ message: 'Start date must be before end date.' });
        }

        // Check if there are overlapping bookings
        const overlappingBooking = await Booking.findOne({
            furnitureId,
            $or: [
                { startDate: { $lt: end }, endDate: { $gt: start } }, // New booking overlaps with existing booking
                { startDate: { $gte: start, $lt: end } }, // Existing booking overlaps with new booking
                { endDate: { $gt: start, $lte: end } } // Existing booking overlaps with new booking
            ]
        });

        if (overlappingBooking) {
            return res.status(409).json({ message: 'Requested dates are not available.' });
        }

        // If all validations pass, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error validating booking details:', error);
        res.status(500).json({ message: 'Failed to validate booking details', error: error.message });
    }
};

module.exports = {
    validateBookingDetails
};
