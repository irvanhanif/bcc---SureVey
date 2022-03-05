const connection = require('../config');

const tablename = "kriteria";

module.exports = {
    postKriteria: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_usia, id_gender, id_pekerjaan, id_status, id_domisili)
            VALUES (?,?,?,?,?)`,
            [
                req.id_usia,
                req.id_gender,
                req.id_pekerjaan,
                req.id_status,
                req.id_domisili
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}