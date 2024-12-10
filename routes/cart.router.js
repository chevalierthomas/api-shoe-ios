const express = require('express');
var router = express.Router();
const cartController = require('../controllers/cart.controller')

router.get("/", cartController.getCart)
router.post("/", cartController.addItem)
router.put("/", cartController.updateItem)
router.delete("/", cartController.deleteItem)

module.exports = router;