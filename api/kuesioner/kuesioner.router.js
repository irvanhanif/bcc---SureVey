const express = require('express');
const router = express.Router();

const {
    inputKuesioner,
    getAllKuesioner,
    getKuesioner
} = require('./kuesioner.controller');
const { userToken } = require('../middleware');

router.post('/input/:id', userToken, inputKuesioner);
router.get('/:id', getKuesioner);
router.get('/', getAllKuesioner);

module.exports = router;