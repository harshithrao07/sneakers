const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
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
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order', orderSchema)