const express = require('express');
const router = express.Router();

const {
    inputKuesioner,
    getAllKuesioner,
    getKuesioner,
    search,
    getAllPaket,
    getPaket,
    submitKuesioner
} = require('./kuesioner.controller');
const { userToken } = require('../middleware');

router.post('/input/:id', userToken, inputKuesioner);
router.post('/submit/:id', userToken, submitKuesioner);
router.get('/search/:nama', search);
router.get('/paket', getAllPaket);
router.get('/paket/:id', getPaket);
router.get('/:id', getKuesioner);
router.get('/', getAllKuesioner);

module.exports = router;