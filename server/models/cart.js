const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    items: [{
        productId: {
            type: String
        },
        name: String,
        imageUrl: String,
        brand: String,
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = Cart = mongoose.model('cart', cartSchema)