const connection = require('../config');

const tablename = "usia";

module.exports = {
    postUsia: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (usia_awal, usia_akhir) VALUES (?, ?)`,
            [
                req.usia_awal,
                req.usia_akhir
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}