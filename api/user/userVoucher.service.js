const connection = require('../config');

const tablename = "user_voucher";

module.exports = {
    takeVoucher: (req, callback) => {
        connection.query(
            `INSERT INTO ${tablename} (id_voucher, id_user)
            VALUES (?, ?)`,
            [
                req.id_voucher,
                req.id_user
            ], 
            (error, result) => {
                if(error) return callback(error);

                return callback(null, result);
            }
        );
    }
}