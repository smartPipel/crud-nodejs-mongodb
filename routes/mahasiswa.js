const router = require('express').Router();

const mahasiswaController = require('../controllers/mahasiswaController');

router.get('/', mahasiswaController.viewMahasiswa);
router.post('/', mahasiswaController.addMahasiswa);
router.patch('/', mahasiswaController.editMahasiswa);
router.delete('/:id', mahasiswaController.deleteMahasiswa);
// router.get('/:nama', mahasiswaController.searchMahasiswa);



module.exports = router;