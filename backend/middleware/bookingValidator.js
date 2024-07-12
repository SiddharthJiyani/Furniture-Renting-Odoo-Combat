const Booking = require('../models/Booking');
const mongoose = require('mongoose');

const validateBookingDetails = async (req, res, next) => {
    const { furnitureId, startDate, endDate } = req.body;

    try {
        // Validate furnitureId
        if (!mongoose.Types.ObjectId.isValid(furnitureId)) {
            return res.status(400).json({ message: 'Invalid furnitureId' });
        }

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

        // Check for overlapping bookings
        const overlappingBooking = await Booking.findOne({
            furnitureId,
            $or: [
                { startDate: { $lt: end }, endDate: { $gt: start } },
                { startDate: { $gte: start, $lt: end } },
                { endDate: { $gt: start, $lte: end } }
            ]
        });

        if (overlappingBooking) {
            return res.status(409).json({ message: 'Requested dates are not available.' });
        }

        next();
    } catch (error) {
        console.error('Error validating booking details:', error);
        res.status(500).json({ message: 'Failed to validate booking details', error: error.message });
    }
};

module.exports = { validateBookingDetails };
