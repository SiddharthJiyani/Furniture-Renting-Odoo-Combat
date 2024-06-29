const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    furnitureId: { type: Schema.Types.ObjectId, ref: 'Furniture', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Wishlist;
