const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, 'SVP'+ new Date().getMonth() + new Date().getFullYear()
        + Math.random().toString(35).slice(2) + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('foto');

module.exports = upload;