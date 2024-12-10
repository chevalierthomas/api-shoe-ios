const pool = require("../database/db");
const {as} = require("pg-promise");

const getShoesList = (callback) => {
    getShoesListAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getShoesListAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT shoe.name, shoe.imageURL, shoe.price\n" +
            "FROM shoe;\n");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getShoesListAsync:', error);
        throw error;
    }
}

const getOneShoeDetails = (body, callback) => {
    getOneShoeDetailsAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getOneShoeDetailsAsync(body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT *\n" +
            "FROM shoe\n" +
            "WHERE shoe.idShoe = $1", [body.id_shoe]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getLaureatByIdAsync:', error);
        throw error;
    }
}


module.exports = {
    getShoesList,
    getOneShoeDetails
}