const connection = require('../config');

const tablename = "user";

module.exports = {
    postUser: (req, callback) => {
        req.ttl = req.ttl + " 00:00:00";
        req.ttl = new Date(req.ttl+ "+0000").toISOString();
        connection.query(
            `INSERT INTO ${tablename} (email, password, username, ttl, id_gender, id_pekerjaan, id_status, id_domisili)
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                req.email,
                req.password,
                req.username,
                req.ttl,
                req.id_gender,
                req.id_pekerjaan,
                req.id_status,
                req.id_domisili
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getUser: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} u 
            JOIN gender g ON u.id_gender = g.id_gender
            JOIN pekerjaan p ON u.id_pekerjaan = p.id_pekerjaan
            JOIN status s ON u.id_status = s.id_status
            JOIN domisili d ON u.id_domisili = d.id_domisili
            JOIN provinsi pr ON d.id_provinsi = pr.id_provinsi
            JOIN kota k ON d.id_kota = k.id_kota
            WHERE id_user = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getUserbyEmail: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE email = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    updatePoin: (req, callback) => {
        connection.query(
            `UPDATE ${tablename} SET poin_user = ? WHERE id_user = ?`,
            [
                req.poin,
                req.id_user
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getPoin: (req, callback) => {
        connection.query(
            `SELECT poin_user FROM ${tablename} WHERE id_user = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    updateUser: (req, callback) => {
        connection.query(
            `UPDATE ${tablename} SET id_pekerjaan = ?, id_status = ?, id_domisili = ?, update_time_user = NOW() WHERE id_user = ?`,
            [
                req.id_pekerjaan,
                req.id_status,
                req.id_domisili,
                req.id_user
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getDayHad: (req, callback) => {
        connection.query(
            `SELECT DATEDIFF(NOW(), ?) AS day`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    }
}