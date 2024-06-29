const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    rentalPrice: { type: Number, required: true },
    availabilityStatus: { type: Boolean, default: true },
    location: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Furniture = mongoose.model('Furniture', furnitureSchema);
module.exports = Furniture;
