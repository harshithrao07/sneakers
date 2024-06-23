const { Router } = require('express')
const itemController = require("../controllers/itemController")
const router = Router()

router.get("/sneakers", itemController.get_items)
router.get("/sneakers/:id", itemController.get_item)

module.exports = router