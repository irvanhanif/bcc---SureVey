const connection = require('../config');

const tablename = "gender";

module.exports = {
    allGender: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result)
            }
        )
    }
}