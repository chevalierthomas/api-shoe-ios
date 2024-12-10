const pool = require("../database/db");
const {as} = require("pg-promise");

const getCart = (body,callback) => {
    getCartAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getCartAsync(body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT cart.idShoe, cart.quantity, s.name, s.price, s.imageURL\n" +
            "FROM cart\n" +
            "JOIN shoe s on cart.idShoe = s.idShoe \n" +
            "WHERE idClient = $1", [body.id_client]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getCartAsync:', error);
        throw error;
    }
}

const addItem = (body,callback) => {
    addItemAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function addItemAsync(body) {
    try {
        const conn = await pool.connect();
        const query = `
            INSERT INTO cart (idShoe, idClient, quantity)
            VALUES ($1, $2, $3)
                ON CONFLICT (idShoe, idClient) 
            DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity;
        `;
        const values = [body.id_shoe, body.id_client, body.quantity];
        const result = await conn.query(query, values);
        conn.release();
        console.log(result.rowCount)
        return result.rowCount; // Nombre de lignes affectées
    } catch (error) {
        console.error('Error in addItemAsync:', error);
        throw error;
    }
}


const updateItem = (body,callback) => {
    updateItemAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateItemAsync(body) {
    try {
        const conn = await pool.connect();
        const query = `
            UPDATE cart
            SET quantity = $3
            WHERE idClient = $1 AND idShoe = $2;
        `;
        const values = [body.id_client, body.id_shoe, body.quantity];
        const result = await conn.query(query, values);
        conn.release();
        return result.rowCount; // Nombre de lignes affectées
    } catch (error) {
        console.error('Error in updateItemAsync:', error);
        throw error;
    }
}

const deleteItem = (body,callback) => {
    deleteItemAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteItemAsync(body) {
    try {
        const conn = await pool.connect();
        const query = `
            DELETE FROM cart
            WHERE idClient = $1 AND idShoe = $2;
        `;
        const values = [body.id_client, body.id_shoe];
        const result = await conn.query(query, values);
        conn.release();
        return result.rowCount; // Nombre de lignes supprimées
    } catch (error) {
        console.error('Error in deleteItemAsync:', error);
        throw error;
    }
}

module.exports = {
    getCart,
    addItem,
    updateItem,
    deleteItem
}