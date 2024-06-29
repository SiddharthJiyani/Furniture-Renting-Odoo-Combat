const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully",
            categories
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Categories cannot be fetched. Please try again.",
        })
    }
});

// Create a new category
router.post('/create', async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = new Category({ categoryName });

        //check if category already exists
        const existingCategory = await Category.findOne ({ categoryName });

        if ( existingCategory ) {
            return res.status(400).json({
                success: false,
                message: "Category already exists. Please try again with a different category name.",
            })
        }

        const newCategory = await category.save();
        return res.status(201).json({
            success: true,
            newCategory,
            message: "Category created successfully",
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Category cannot be created. Please try again.",
        })
    }
});

module.exports = router;