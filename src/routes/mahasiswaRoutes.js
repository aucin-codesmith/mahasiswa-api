const express = require('express');

const {
    getAllMahasiswa,
    getMahasiswaByNim,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa
} = require('../controllers/mahasiswaController');

const router = express.Router();

router.get('/', getAllMahasiswa);
router.get('/:nim', getMahasiswaByNim);
router.post('/', createMahasiswa);
router.put('/:nim', updateMahasiswa);
router.delete('/:nim', deleteMahasiswa);

module.exports = router;