const Sneaker = require('../models/items')

module.exports.get_items = (req, res) => {
    Sneaker.find().then(items => res.json({items}))
}

module.exports.get_item = (req, res) => {
    const id = req.params.id
    Sneaker.findOne({id}).then(item => res.json({item}))
}
