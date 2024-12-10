const shoesService = require('../services/shoes.service');
const {query} = require("express");

exports.getShoesList = (req, res) => {
    shoesService.getShoesList((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "shoes list", data });

        }
    })
}

exports.getOneShoeDetails = (req, res) => {
    const body = req.body;
    shoesService.getOneShoeDetails(body, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send({ success: true, message: "shoe details", data });

        }
    })
}
