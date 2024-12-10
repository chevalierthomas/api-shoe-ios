const orderService = require('../services/order.service')
const {query} = require("express");

exports.checkout = (req, res) => {
    const body = req.body;
    orderService.checkout(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "Checkout done", data });
        }
    })
}

exports.getOrders = (req, res) => {
    const body = req.body;
    orderService.getOrders(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "orders list", data });
        }
    })
}

exports.getOrderDetails = (req, res) => {
    const body = req.body;
    orderService.getOrderDetails(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "details order", data });
        }
    })
}