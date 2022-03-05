const {
    postUser,
    getUser,
    getUserbyEmail
} = require('./user.service');
const { postDomisili } = require('../domisili/domisili.service');
const { buyPaket } = require('./paket.service');
const { takeVoucher } = require('./voucher.service');
const { ERROR, SUCCESS } = require('../respon');
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require('jsonwebtoken');

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
    buyPaket: (req, res) => {
        req.body.id_paket = req.params.id;
        req.body.id_user = req.decoded.user.id_user;
        buyPaket(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, "Success buy paket");
        })
    }
}