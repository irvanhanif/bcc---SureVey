const connection = require('../config');

const tablename = "kuesioner";

module.exports = {
    postKuesioner: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (nama_kuesioner, link_kuesioner, id_kriteria, syarat_tmbh, id_paket, id_user, id_payment, foto, has_pay)
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                req.nama,
                req.link,
                req.id_kriteria,
                req.syarat,
                req.id_paket,
                req.id_user,
                req.id_payment,
                req.foto,
                req.has_pay
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    allKuesioner: (callback) => {
        connection.query(
            `SELECT * FROM ${tablename} k 
            JOIN kriteria kr ON k.id_kriteria = kr.id_kriteria
            JOIN paket p ON k.id_paket = p.id_paket
            JOIN usia u ON kr.id_usia = u.id_usia
            JOIN gender g ON kr.id_gender = g.id_gender
            JOIN pekerjaan pk ON kr.id_pekerjaan = pk.id_pekerjaan
            JOIN status s ON kr.id_status = s.id_status
            JOIN domisili d ON kr.id_domisili = d.id_domisili
            JOIN provinsi pr ON d.id_provinsi = pr.id_provinsi
            JOIN kota ko ON d.id_kota = ko.id_kota`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    detailKuesioner: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} k 
            JOIN kriteria kr ON k.id_kriteria = kr.id_kriteria
            JOIN paket p ON k.id_paket = p.id_paket
            JOIN usia u ON kr.id_usia = u.id_usia
            JOIN gender g ON kr.id_gender = g.id_gender
            JOIN pekerjaan pk ON kr.id_pekerjaan = pk.id_pekerjaan
            JOIN status s ON kr.id_status = s.id_status
            JOIN domisili d ON kr.id_domisili = d.id_domisili
            JOIN provinsi pr ON d.id_provinsi = pr.id_provinsi
            JOIN kota ko ON d.id_kota = ko.id_kota
            WHERE id_kuesioner = ?`,
            [
                req
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    searchKuesioner: (req, callback) => {
        connection.query(
            `SELECT * FROM ${tablename} WHERE nama_kuesioner LIKE '%${req}%'`,
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    updatePayment: (req, callback) => {
        connection.query(
            `UPDATE ${tablename} SET has_pay = ? WHERE id_kuesioner = ?`,
            [
                req.has_pay,
                req.id_kuesioner
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    },
    getKuesionerbyIdPayment: (req, callback) => {
        connection.query(
            `SELECT id_kuesioner FROM ${tablename} WHERE id_payment = ?`,
            [
                req.id_payment
            ],
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        )
    }
}