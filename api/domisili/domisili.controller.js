const {
    getAllProvinsi,
    getAllKota,
    getKota
} = require('./domisili.service');
const { ERROR, SUCCESS } = require('../respon');

module.exports = {
    allProvinsi: (req, res) => {
        getAllProvinsi((error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    allKota: (req, res) => {
        getAllKota((error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    getKota: (req, res) => {
        getKota(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    }
}