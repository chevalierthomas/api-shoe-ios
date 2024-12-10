const express = require('express');
var router = express.Router();
const shoesController = require('../controllers/shoes.controller')

router.get("/", shoesController.getShoesList)
router.get("/details", shoesController.getOneShoeDetails)

module.exports = router;