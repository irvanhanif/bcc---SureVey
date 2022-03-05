const connection = require('../config');

const tablename = "status";

module.exports = {
    allStatus: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result)
            }
        )
    }
}