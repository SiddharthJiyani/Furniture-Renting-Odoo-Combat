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
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('furnitureId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

exports.getBookingDetails = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('furnitureId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking details', error: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Assuming only admins can update status
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to update booking status' });
        }

        booking.status = req.body.status;
        booking.updatedAt = Date.now();
        await booking.save();

        res.json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status', error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if the user is authorized to cancel this booking
        if (booking.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        booking.status = 'cancelled';
        booking.updatedAt = Date.now();
        await booking.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
};

module.exports = {
    createBooking,
   
};
