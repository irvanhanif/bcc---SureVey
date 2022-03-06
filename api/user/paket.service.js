const connection = require('../config');

const tablename = "user_paket";

module.exports = {
    buyPaket: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_user, id_paket)`
            [
                req.id_user,
                req.id_paket
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    allPaket: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    }
}