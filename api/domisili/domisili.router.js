const express = require('express')
const router = express.Router();

const {
    allProvinsi,
    allKota,
    getKota
} = require('./domisili.controller');

router.get('/provinsi', allProvinsi);
router.get('/kota', allKota);
router.get('/kota/:id', getKota);

module.exports = router;