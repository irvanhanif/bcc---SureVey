const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getAllPaket,
    buyPaket,
    uploadPhoto,
    getPhoto
} = require('./user.controller');
const { userToken } = require('../middleware');
const upload = require('../multer');

router.post('/register', register);
router.post('/login', login);
router.post('/charge/:id', userToken, buyPaket);
router.post('/upload', uploadPhoto);
router.get('/paket', getAllPaket);
router.get('/photo/:filename', getPhoto);

module.exports = router;