const { allGender } = require('./gender.service');
const { allPekerjaan } = require('./pekerjaan.service');
const { allStatus } = require('./status.service');
const { ERROR, SUCCESS } = require('../respon');

module.exports = {
    getAllGender: (req, res) => {
        allGender((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        });
    },
    getAllPekerjaan: (req, res) => {
        allPekerjaan((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        });
    },
    getAllStatus: (req, res) => {
        allStatus((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        });
    }
}