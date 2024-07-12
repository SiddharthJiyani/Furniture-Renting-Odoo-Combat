const Booking = require('../models/Booking');
const User = require('../models/User');
const Furniture = require('../models/Furniture');
const mongoose = require('mongoose');

const createBooking = async (req, res) => {
    const { userId, furnitureId, startDate, endDate, totalPrice } = req.body;

    try {
        // Validate userId and furnitureId
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(furnitureId)) {
            return res.status(400).json({ message: 'Invalid userId or furnitureId' });
        }

        // Check if user and furniture exist
        const user = await User.findById(userId);
        const furniture = await Furniture.findById(furnitureId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!furniture) {
            return res.status(404).json({ message: 'Furniture not found' });
        }

        // Create the booking
        const booking = new Booking({
            userId,
            furnitureId,
            startDate,
            endDate,
            totalPrice
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('furnitureId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
    }
};

module.exports = { createBooking, getBookings };
