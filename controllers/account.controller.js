const accountService = require('../services/account.service')
const {query} = require("express");

exports.login = (req, res) => {
    const body = req.body;
    accountService.login(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "login successful", data });
        }
    })
}

exports.register = (req, res) => {
    const body = req.body;
    accountService.register(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "register successful", data });
        }
    })
}

exports.updateAccount = (req, res) => {
    const body = req.body;
    accountService.updateAccount(body,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "updating user account successful", data });
        }
    })
}