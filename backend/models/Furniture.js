const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    rentalPrice: { type: Number, required: true },
    availabilityStatus: { type: Boolean, default: true },
    location: { type: String },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Furniture', furnitureSchema);
