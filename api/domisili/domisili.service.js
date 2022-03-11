const connection = require('../config');

const tablenameProv = "provinsi";
const tablenameKota = "kota";
const tablename = "domisili";

module.exports = {
    postDomisili: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_provinsi, id_kota) VALUES (?, ?)`,
            [
                req.id_provinsi,
                req.id_kota
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getAllProvinsi: (callback) => {
        connection.query(
            `SELECT * FROM ${tablenameProv}`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getAllKota: (callback) => {
        connection.query(
            `SELECT * FROM ${tablenameKota} k
            JOIN ${tablenameProv} p ON k.id_provinsi = p.id_provinsi`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getKota: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablenameKota} WHERE id_provinsi = ?`,
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