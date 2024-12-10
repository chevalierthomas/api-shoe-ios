const express = require('express');
var router = express.Router();
const accountController = require('../controllers/account.controller')

router.get("/login", accountController.login)
router.post("/register", accountController.register)
router.put("/update", accountController.updateAccount)

module.exports = router;