const {
    postKuesioner,
    allKuesioner,
    detailKuesioner,
    searchKuesioner
} = require('./kuesioner.service');
const { postKriteria } = require('../kriteria/kriteria.service');
const { postDomisili } = require('../domisili/domisili.service');
const { allPaket, detailPaket } = require('../kuesioner/paket.service');
const { postUsia } = require('../kriteria/usia.sevice');
const { responded, countResponden } = require('./userRespon.service');
const { updatePoin, getPoin } = require('../user/user.service');
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

                        if(req.body.id_paket == 1) {
                            postKuesioner(req.body, (errors3, results2) => {
                                if(errors3) return ERROR(res, 500, errors3);
            
                                return SUCCESS(res, 200, "success submit form");
                            });
                        }else{
                            switch(req.body.id_paket){
                                case 2:
                                    ;
                                case 3:
                                    ;
                                case 4:
                            }
                        }
                    });
                });
            });
        });
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