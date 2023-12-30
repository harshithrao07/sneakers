const { Router } = require('express')
const router = Router()
const cartController = require("../controllers/cartController")

router.post("/cart", cartController.add_to_cart)
router.get("/cart/:id", cartController.get_cart_items)
router.post("/cart-remove", cartController.remove_item_cart)
router.post("/cart-update", cartController.update_cart_quantity)

module.exports = router