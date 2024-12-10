const express = require('express');
var router = express.Router();
const orderController = require('../controllers/order.controller')

router.post("/checkout", orderController.checkout)
router.get("/", orderController.getOrders)
router.get("/details", orderController.getOrderDetails)

module.exports = router;