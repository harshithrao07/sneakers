const { Router } = require('express')
const router = Router()
const orderController = require('../controllers/orderController')

router.post("/create-order", orderController.create_order)
router.get("/order/:id", orderController.get_order)

module.exports = router