const {
    postKuesioner,
    allKuesioner,
    detailKuesioner,
    searchKuesioner,
    updatePayment,
    getKuesionerbyIdPayment
} = require('./kuesioner.service');
const { postKriteria } = require('../kriteria/kriteria.service');
const { postDomisili } = require('../domisili/domisili.service');
const { allPaket, detailPaket } = require('../kuesioner/paket.service');
const { postUsia } = require('../kriteria/usia.sevice');
const { responded, countResponden } = require('./userRespon.service');
const { updatePoin, getPoin } = require('../user/user.service');
const { buyPaket, getResponse, updateResponse } = require('./midtrans.service');
const { coreApi } = require('../midtrans');
const upload = require('../multer');
const { ERROR, SUCCESS } = require('../respon');

module.exports = {
    inputKuesioner: (req, res) => {
        if(req.decoded.user.id_user != req.params.id) return ERROR(res, 409, "user doesn't match with id");
        req.body.id_user = req.params.id;
        postUsia(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
        
            req.body.id_usia = result.insertId;
            postDomisili(req.body, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
    
                req.body.id_domisili = results.insertId;
                postKriteria(req.body, (errors1, results1) => {
                    if(errors1) return ERROR(res, 500, errors1);
    
                    req.body.id_kriteria = results1.insertId;
                    upload(req, res, (errors2) => {
                        if(errors2) return ERROR(res, 500, errors2);
                        if(req.file == undefined) req.body.foto = 'SVP000000-Sample'+ Math.floor(Math.random() * 3 + 1) + '.png';
                        else req.body.foto = req.file.filename;

                        req.body.id_user = req.decoded.user.id_user;
                        if(req.body.id_paket == 1) {
                            req.body.has_pay = true;
                            postKuesioner(req.body, (errors3, results2) => {
                                if(errors3) return ERROR(res, 500, errors3);
            
                                return SUCCESS(res, 200, "success submit form");
                            });
                        }else{
                            detailPaket(req.body.id_paket, (errors3, results2) => {
                                if(errors3) return ERROR(res, 500, errors3);

                                let data;
                                switch(req.body.id_paymentMethod){
                                    case 1:
                                        data = {
                                            "payment_type": "bank_transfer",
                                            "bank_transfer":{
                                                "bank": "bca"
                                            }
                                        };
                                        break;
                                    case 2:
                                        data = {
                                            "payment_type": "bank_transfer",
                                            "bank_transfer":{
                                                "bank": "bni"
                                            }
                                        };
                                        break;
                                    case 3:
                                        data = {
                                            "payment_type": "bank_transfer",
                                            "bank_transfer":{
                                                "bank": "bri"
                                            }
                                        };
                                        break;
                                    case 4:
                                        data = {
                                            "payment_type": "permata",
                                        };
                                        break;
                                    case 5:
                                        data = {
                                            "payment_type": "gopay"
                                        };
                                        break;
                                    case 6:
                                        data = {
                                            "payment_type": "cstore",
                                            "cstore" : {
                                                "store" : "alfamart",
                                            }
                                        };
                                        break;
                                    case 7:
                                        data = {
                                            "payment_type": "cstore",
                                            "cstore" : {
                                                "store" : "indomaret",
                                                "message" : "Message to display"
                                            }
                                        };
                                };
                                data.transaction_details = {
                                    gross_amount: results2[0].harga_paket,
                                    order_id: "PSV-" + Math.random().toString(35).slice(2)
                                }
                                coreApi.charge(data).then(response => {
                                    let respayment = {
                                        id_payment: response.order_id,
                                        payment_method: req.body.id_paymentMethod,
                                        response_midtrans: JSON.stringify(response)
                                    }
                                    buyPaket(respayment, (errors4, results3) => {
                                        if(errors4) return ERROR(res, 500, errors4);
                                        
                                        req.body.id_payment = response.order_id;
                                        req.body.has_pay = false;
                                        postKuesioner(req.body, (errors5, results4) => {
                                            if(errors5) return ERROR(res, 500, errors5);
                                            
                                            getResponse(response.order_id, (errors6, results5) => {
                                                if(errors6) return ERROR(res, 500, errors6);
    
                                                return SUCCESS(res, 200, JSON.parse(results5[0].response_midtrans));
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                });
            });
        });
    },
    notifikasi: (req, res) => {
        coreApi.transaction.notification(req.body)
        .then((statusResponse)=>{
            req.body.id_payment = statusResponse.order_id;
            req.body.response_midtrans = JSON.stringify(statusResponse);
            let transactionStatus = statusResponse.transaction_status;
            
            if (transactionStatus == 'settlement'){
                req.body.has_pay = true;   
            } else if (transactionStatus == 'cancel' || transactionStatus == 'expire'){
                req.body.has_pay = false;
            }
            updateResponse(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);

                getKuesionerbyIdPayment(req.body, (errors, results) => {
                    if(errors) return ERROR(res, 500, errors);
                    
                    if(results.length == 0) return ERROR(res, 404, "kuesioner not found");
                    req.body.id_kuesioner = results[0].id_kuesioner;
                    updatePayment(req.body, (errors1, results1) => {
                        if(errors1) return ERROR(res, 500, errors1);
    
                        return SUCCESS(res, 200, "success submit form");
                    })
                });
            });
        });
    },
    getRespon: (req, res) => {
        getResponse(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, JSON.parse(result[0].response_midtrans));
        })
    },
    getAllKuesioner: (req, res) => {
        allKuesioner((error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    getKuesioner: (req, res) => {
        detailKuesioner(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    search: (req, res) => {
        searchKuesioner(req.params.nama, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    getAllPaket: (req, res) => {
        allPaket((error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    getPaket: (req, res) => {
        detailPaket(req.params.id, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        });
    },
    submitKuesioner: (req, res) => {
        if(req.body.has_resp == 0) return ERROR(res, 409, "user must be submit form");
        req.body.id_user = req.decoded.user.id_user;
        req.body.id_kuesioner = req.params.id;
        detailKuesioner(req.body.id_kuesioner, (error, result) => {
            if(error) return ERROR(res, 500, error);

            countResponden(req.body.id_kuesioner, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                
                if(results[0].total_resp >= result[0].max_respon) return ERROR(res, 409, "Submitted is max of capacity");
                responded(req.body, (errors1, results1) => {
                    if(errors1) return ERROR(res, 500, errors1);
        
                    getPoin(req.body.id_user, (errors2, results2) => {
                        if(errors2) return ERROR(res, 500, errors2);
        
                        req.body.poin = results2[0].poin_user + result[0].poin_paket;
                        updatePoin(req.body, (errors3, results3) => {
                            if(errors3) return ERROR(res, 500, errors3);
                            
                            return SUCCESS(res, 200, "Success submit");
                        });
                    });
                });
            });
        });
    }
}