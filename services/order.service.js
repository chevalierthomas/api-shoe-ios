const pool = require("../database/db");
const {as} = require("pg-promise");


const checkout = (body,callback) => {
    checkoutAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}


async function checkoutAsync(body) {
    const clientId = body.id_client;
    try {
        const conn = await pool.connect();
        // Début d'une transaction
        await conn.query('BEGIN');

        // 1. Créer la commande
        const orderResult = await conn.query(
            `INSERT INTO client_order (idClient)
             VALUES ($1)
             RETURNING idOrder;`,
            [clientId]
        );
        const orderId = orderResult.rows[0].idorder;

        // 2. Insérer les lignes de commande
        await conn.query(
            `INSERT INTO order_line (idOrder, idShoe, quantity, price)
             SELECT $1, c.idShoe, c.quantity, s.price
             FROM cart c
             JOIN shoe s ON c.idShoe = s.idShoe
             WHERE c.idClient = $2;`,
            [orderId, clientId]
        );

        // 3. Vider le panier
        await conn.query(`DELETE FROM cart WHERE idClient = $1;`, [clientId]);

        // Commit de la transaction
        await conn.query('COMMIT');
        conn.release();

        return { success: true, message: "Checkout completed successfully", orderId };
    } catch (error) {
        console.error('Error in checkout:', error);
        throw error;
    }
}


const getOrders = (body,callback) => {
    getOrdersAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}


async function getOrdersAsync(body) {
    const clientId = body.id_client;
    try {
        const conn = await pool.connect();
        const query = `
            SELECT
                co.idOrder,
                co.dateOrder,
                SUM(ol.quantity * ol.price) AS totalPrice
            FROM client_order co
                     LEFT JOIN order_line ol ON co.idOrder = ol.idOrder
            WHERE co.idClient = $1
            GROUP BY co.idOrder, co.dateOrder;
        `;
        const values = [clientId];
        const result = await conn.query(query, values);
        conn.release();

        // Transform totalPrice to float for all rows
        const rows = result.rows.map(row => ({
            ...row,
            totalprice: parseFloat(row.totalprice)
        }));

        return rows;
    } catch (error) {
        console.error('Error in getOrdersAsync:', error);
        throw error;
    }
}


const getOrderDetails = (body,callback) => {
    getOrderDetailsAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getOrderDetailsAsync(body) {
    const orderId = body.id_order;
    try {
        const conn = await pool.connect();
        const query = `
            SELECT ol.idShoe, ol.quantity, ol.price, s.name, s.imageURL
            FROM order_line ol
            JOIN shoe s ON ol.idShoe = s.idShoe
            WHERE ol.idOrder = $1;
        `;
        const values = [orderId];
        const result = await conn.query(query, values);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getOrderDetails:', error);
        throw error;
    }
}

module.exports = {
    checkout,
    getOrders,
    getOrderDetails
};
