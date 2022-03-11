const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getProfil,
    getAllVoucher,
    getVoucher,
    voucherUser
} = require('./user.controller');
const { userToken } = require('../middleware');

router.post('/register', register);
router.post('/login', login);
// router.post('/redeem', voucherUser);
router.get('/profil/:id', userToken, getProfil);
router.get('/voucher', getAllVoucher);
router.get('/voucher/:id', getVoucher);

module.exports = router;