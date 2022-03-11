const connection = require('../config');

const tablename = "user_respond";

module.exports = {
    responded: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_user, id_kuesioner, has_resp)
            VALUES (?, ?, ?)`,
            [
                req.id_user,
                req.id_kuesioner,
                req.has_resp
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    countResponden: (req, callback) => {
        connection.query(
            `SELECT COUNT(id_kuesioner) AS total_resp, id_kuesioner 
            FROM ${tablename} WHERE id_kuesioner = ? GROUP BY id_kuesioner`,
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