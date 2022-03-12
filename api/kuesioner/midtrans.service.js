const connection = require('../config');

const tablename = "payment";

module.exports = {
    buyPaket: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_payment, response_midtrans, payment_method)
            VALUES (?, ?, ?)`,
            [
                req.id_payment,
                req.response_midtrans,
                req.payment_method
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getResponse: (req, callback) => {
        connection.query(
            `SELECT response_midtrans FROM ${tablename} WHERE id_payment = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) callback(error);

                return callback(null, result);
            }
        );
    },
    updateResponse: (req, callback) => {
        connection.query(
            `UPDATE ${tablename} SET response_midtrans = ? WHERE id_payment = ?`,
            [
                req.response_midtrans,
                req.id_payment
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}