const Cart = require("../models/cart")

module.exports.get_cart_items = async (req, res) => {
    const userId = req.params.id
    try {
        let cart = await Cart.find({ userId })
        if (cart && cart.length > 0) {
            res.send(cart)
        } else {
            res.send(null)
        }
    } catch (err) {
        res.status(500).send("Something went wrong")
    }
}

module.exports.add_to_cart = async (req, res) => {
    const userId = req.body.id
    const items = req.body.items
    const bill = req.body.bill
    const productId = items[0].productId
    const quantity = items[0].quantity
    const name = items[0].name
    const imageUrl = items[0].imageUrl
    const price = items[0].price
    const brand = items[0].brand
    try {
        const query = { userId: userId, 'items.productId': productId };
        const cart = await Cart.findOne(query);
        if (cart) {
            const existingItem = cart.items[0]
            existingItem.quantity += quantity;
            cart.bill += bill;
            await cart.save();
            return res.json({ msg: "Cart updated successfully" });

        } else {
            const newCartItem = await Cart({ userId, items: [{ productId, price, brand, quantity, name, imageUrl }], bill });
            await newCartItem.save();
            return res.json({ msg: "Successfully added items to cart" });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Could not add/update items in the cart", err: err });
    }
}

module.exports.remove_item_cart = async(req, res) => {
    const productId = req.body.productId
    const userId = req.body.userId
    try {
        const cart = await Cart.findOne({ 'items.productId' : productId, userId: userId })
        if(cart) {
            const result = await cart.deleteOne()
            res.json({'msg': 'Successfully deleted'})
        } else {
            res.send(null)
        }
    } catch(error) {
        return res.status(500).json({ msg: "Could not delete item from the cart", err: error });
    }
}

module.exports.update_cart_quantity = async(req, res) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const newQuantity = req.body.quantity
    try {
        const cart = await Cart.findOne({ userId: userId, 'items.productId': productId})
        cart.items[0].quantity = newQuantity
        cart.bill = newQuantity * cart.items[0].price
        cart.save()
        res.json({'msg': 'Successfully updated cart'})
    } catch(error) {
        return res.status(500).json({ msg: "Could not update item in the cart", err: err });
    }
}