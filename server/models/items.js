const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name : {
        type: String,
    },
    brand : {
        type: String,
    },
    gender : {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
    is_in_inventory: {
        type: Boolean
    },
    items_left: {
        type: Number
    },
    imageURL: {
        type: String
    },
    slug: {
        type: String
    },
    featured: {
        type: Number
    }
})

module.exports = Sneaker = mongoose.model('sneakers', itemSchema)