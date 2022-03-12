const {
    postUser,
    getUser,
    getUserbyEmail,
    updatePoin
} = require('./user.service');
const { postDomisili } = require('../domisili/domisili.service');
const { takeVoucher } = require('./userVoucher.service');
const { allVoucher, detailVoucher } = require('./voucher.service');
const { ERROR, SUCCESS } = require('../respon');
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require('jsonwebtoken');
const { toDataURL } = require('qrcode');

const salt = genSaltSync(10);

module.exports = {
    register: (req, res) => {
        req.body.password = hashSync(req.body.password, salt);
        postDomisili(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);

            req.body.id_domisili = result.insertId;
            postUser(req.body, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);

                getUser(results.insertId, (errors1, results1) => {
                    if(errors1) return ERROR(res, 404, errors);

                    delete results1[0].password;
                    results1[0].ttl = new Date(results1[0].ttl).toLocaleDateString();
                    results1[0].token = sign({user: results1[0]}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"});
                    return SUCCESS(res, 200, results1);
                });
            });
        });
    },
    login: (req, res) => {
        getUserbyEmail(req.body.email, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "Email is incorrect");
            
            const validation = compareSync(req.body.password, result[0].password);
            if(!validation) return ERROR(res, 409, "Password are invalid");

            getUser(result[0].id_user, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);

                delete results[0].password;
                results[0].ttl = new Date(results[0].ttl).toLocaleDateString();
                results[0].token = sign({user: results[0]}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"});
                return SUCCESS(res, 200, results);
            });
        });
    },
    getProfil: (req, res) => {
        if(req.decoded.user.id_user != req.params.id) return ERROR(res, 409, "user doesn't match with id");
        getUser(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    getAllVoucher: (req, res) => {
        allVoucher((error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    getVoucher: (req, res) => {
        detailVoucher(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    voucherUser: (req, res) => {
        req.body.id_user = req.decoded.user.id_user;
        req.body.id_voucher = req.params.id;
        getUser(req.body.id_user, (error, result) => {
            if(error) return ERROR(res, 500, error);

            detailVoucher(req.body.id_voucher, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
            
                if(result[0].poin_user < results[0].poin_voucher) return SUCCESS(res, 200, "poin user is lower than poin voucher");
                takeVoucher(req.body, (errors1, results1) => {
                    if(errors1) return ERROR(res, 500, errors1);
                    
                    req.body.poin = result[0].poin_user - results[0].poin_voucher;
                    updatePoin(req.body, (errors2, results2) => {
                        if(errors2) return ERROR(res, 500, errors2);

                        toDataURL(req.body.id_voucher).then(qr => {
                            return SUCCESS(res, 200, {
                                id_voucher: req.body.id_voucher,
                                qrcode: qr
                            });
                        }).catch(err => {
                            return ERROR(res, 500, err);
                        });
                    });
                });
            });
        });
    }
}