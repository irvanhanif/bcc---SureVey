const connection = require('../config');

const tablename = "payment";

module.exports = {
    buyPaket: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_payment, id_paket, id_user, response_midtrans)
            VALUES (?, ?, ?, ?)`,
            [
                req.id_payment,
                req.id_paket,
                req.id_user,
                req.response_midtrans
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}