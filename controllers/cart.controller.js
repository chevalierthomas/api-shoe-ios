const cartService = require('../services/cart.service')
const {query} = require("express");

exports.getCart = (req, res) => {
    const body = req.body;
    cartService.getCart(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "item cart user", data });
        }
    })
}

exports.addItem = (req, res) => {
    const body = req.body;
    cartService.addItem(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "Item added successfully", data });
        }
    })
}

exports.updateItem = (req, res) => {
    const body = req.body;
    cartService.updateItem(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "Item updated successfully", data });
        }
    })
}

exports.deleteItem = (req, res) => {
    const body = req.body;
    cartService.deleteItem(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "Item deleted successfully", data });
        }
    })
}
