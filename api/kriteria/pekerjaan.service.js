const connection = require('../config');

const tablename = "pekerjaan";

module.exports = {
    allPekerjaan: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result)
            }
        )
    }
}