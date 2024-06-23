const Order = require("../models/order")
const Cart = require("../models/cart")

module.exports.create_order = async (req, res) => {
    const userId = req.body.userId
    try {
        const carts = await Cart.find({ userId })
        if (carts && carts.length > 0) {
            let items = [];
            let total = 0;

            carts.forEach((cart) => {
                const item = {
                    productId: cart.items[0].productId,
                    name: cart.items[0].name,
                    imageUrl: cart.items[0].imageUrl,
                    brand: cart.items[0].brand,
                    quantity: cart.items[0].quantity,
                    price: cart.items[0].price,
                };

                items.push(item);
                total += cart.bill;
            });

            const newOrder = new Order({
                userId: userId,
                items: items,
                bill: total,
            });
            await newOrder.save();
            await Cart.deleteMany({ userId })
            return res.json({ msg: 'Created a new Order' })
        } else {
            res.send(null)
        }
    } catch (error) {
        res.status(500).json({ msg: 'Could not create an order' })
    }
}

module.exports.get_order = async (req, res) => {
    const userId = req.params.id
    try {
        let order = await Order.find({ userId })
        if (order && order.length > 0) {
            res.json({ order: order })
        } else {
            res.send(null)
        }
    } catch (err) {
        res.status(500).send("Something went wrong")
    }
}