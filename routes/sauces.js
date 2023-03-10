const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

const multer = require('../middlewares/multer-config');

const saucesCtrl = require('../controllers/sauces');

// All Sauces
router.get('/', auth, saucesCtrl.getAllSauces);

// Sauce by id
router.get('/:id', auth, saucesCtrl.getSauceById);

// new Sauce
router.post('/', auth, multer, saucesCtrl.createSauce);

// update Sauce
router.put('/:id', auth, multer, saucesCtrl.updateSauce);

// delete Sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// like dislike
router.post('/:id/like', auth, saucesCtrl.evalSauce);

module.exports = router;
