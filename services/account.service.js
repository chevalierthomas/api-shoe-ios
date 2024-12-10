const pool = require("../database/db");
const {as} = require("pg-promise");

const login = (body,callback) => {
    loginAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function loginAsync(body) {
    try {
        const conn = await pool.connect();
        const query = `
            SELECT idClient
            FROM client
            WHERE email = $1 AND password = $2;
        `;
        const values = [body.email, body.password];
        const result = await conn.query(query, values);
        conn.release();

        console.log(result)
        if (result.rows.length > 0) {
            return { id_client: result.rows[0].idclient };
        } else {
            throw new Error("Invalid login or password");
        }
    } catch (error) {
        console.error('Error in loginAsync:', error);
        throw error;
    }
}

const register = (body,callback) => {
    registerAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function registerAsync(body) {
    try {
        const conn = await pool.connect();
        const query = `
            INSERT INTO client (firstName, lastName, email, password, dateOfBirth, extraChalk, frequentRefill)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING idClient;
        `;
        const values = [
            body.firstname,
            body.lastname,
            body.email,
            body.password,
            body.dateOfBirth,
            body.extraChalk || false,
            body.frequentRefill || false,
        ];
        const result = await conn.query(query, values);
        conn.release();
        return { id_client: result.rows[0].idclient };
    } catch (error) {
        console.error('Error in registerAsync:', error);
        throw error;
    }
}


const updateAccount = (body,callback) => {
    updateAccountAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateAccountAsync(body) {
    try {
        const conn = await pool.connect();
        const query = `
            UPDATE client
            SET firstName = $1, lastName = $2, email = $3, password = $4, dateOfBirth = $5, extraChalk = $6, frequentRefill = $7
            WHERE idClient = $8;
        `;
        const values = [
            body.firstname,
            body.lastname,
            body.email,
            body.password,
            body.dateOfBirth,
            body.extraChalk || false,
            body.frequentRefill || false,
            body.id_client,
        ];
        const result = await conn.query(query, values);
        conn.release();
        return { success: result.rowCount > 0 };
    } catch (error) {
        console.error('Error in updateAccountAsync:', error);
        throw error;
    }
}


module.exports = {
    login,
    register,
    updateAccount
}