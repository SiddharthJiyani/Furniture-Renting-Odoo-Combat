const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');

// Get all furniture items
router.get('/', async (req, res) => {
    try {
        const furniture = await Furniture.find();
        return res.status(200).json({
            success: true,
            message: "All furniture items fetched successfully",
            furniture
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Furniture items cannot be fetched. Please try again.",
        })
    }
});

// Get a single furniture item by ID
router.get('/:id', async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        if (!furniture) return res.status(404).json({ message: 'Furniture item not found' });
        return res.status(200).json({
            success: true,
            furniture,
            message: "Furniture item fetched successfully",
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Furniture item cannot be fetched. Please try again.",
        })
    }
});

// Create a new furniture item
router.post('/create', async (req, res) => {
    const { 
            name, 
            description,

            // categoryId, 

            categoryId, 

            rentalPrice, 
            availabilityStatus, 
            location, 
            imageUrl } = req.body;

    const furniture = new Furniture({ name, description, categoryId:null, rentalPrice, availabilityStatus, location, imageUrl });

    const furniture = new Furniture({ name, description, categoryId, rentalPrice, availabilityStatus, location, imageUrl });


    try {
        const newFurniture = await furniture.save();
        return res.status(201).json({
            success: true,
            newFurniture,
            message: "Furniture item created successfully",
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false,
            message: "Furniture item cannot be created. Please try again.",
        })
    }
});

// Update a furniture item
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedFurniture = await Furniture.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedFurniture) return res.status(404).json({ message: 'Furniture item not found' });
//         res.json(updatedFurniture);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Delete a furniture item
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedFurniture = await Furniture.findByIdAndDelete(req.params.id);
//         if (!deletedFurniture) return res.status(404).json({ message: 'Furniture item not found' });
//         res.json({ message: 'Furniture item deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;
