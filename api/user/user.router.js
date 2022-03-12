const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getProfil,
    getAllVoucher,
    getVoucher,
    voucherUser,
    riwayatVoucher
} = require('./user.controller');
const { userToken } = require('../middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/redeem/:id', userToken, voucherUser);
router.get('/profil/:id', userToken, getProfil);
router.get('/voucher', getAllVoucher);
router.get('/voucher/:id', getVoucher);
router.get('/myvoucher/:id', userToken, riwayatVoucher);

module.exports = router;