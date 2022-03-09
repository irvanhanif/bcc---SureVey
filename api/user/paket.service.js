const connection = require('../config');

const tablename = "paket";

module.exports = {
    allPaket: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    detailPaket: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE id_paket = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}