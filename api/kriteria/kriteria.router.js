const express = require('express');
const router = express.Router();

const { 
    getAllGender,
    getAllPekerjaan,
    getAllStatus
} = require('./kriteria.controller');

router.get('/gender', getAllGender);
router.get('/pekerjaan', getAllPekerjaan);
router.get('/status', getAllStatus);

module.exports = router;