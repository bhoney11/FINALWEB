const express = require('express');
const router = express.Router();
const toyController = require('../controllers/toyController');
const { protect, isAdmin } = require('../middleware/auth');

router.get('/', toyController.getAll);

router.post('/', protect, isAdmin, toyController.create);
router.put('/:id', protect, isAdmin, toyController.update);
router.delete('/:id', protect, isAdmin, toyController.remove);

module.exports = router;
