//condtollers/bookings.js
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const createBooking = async (req, res) => {
    const { userId, furnitureId, startDate, endDate, totalPrice } = req.body;

    try {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(furnitureId)) {
            return res.status(400).json({ message: 'Invalid ObjectId format for userId or furnitureId.' });
        }

        // Create a new booking instance
        const newBooking = new Booking({
            userId: new mongoose.Types.ObjectId(userId),
            furnitureId: new mongoose.Types.ObjectId(furnitureId),
            startDate,
            endDate,
            totalPrice,
            status: 'pending' // Example status
        });

        // Save the booking to the database
        await newBooking.save();

        // Respond with success message and the created booking
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }
};

module.exports = {
    createBooking
  };