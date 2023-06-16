const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/protectAdmin');
const { fileUploads } = require('../middleware/filehelper');
const {
  createMading,
  updateMading,
  deleteMading,
  getMading,
  getAllMading,
} = require('../controllers/mading');
const router = express.Router();

router.post(
  '/create',
  protect,
  [
    body('title'),
    body('desc'),
    body('category'),
    body('comment'),
    fileUploads.single('image'),
  ],
  createMading
);

router.put(
  '/:id',
  protect,
  [
    body('title'),
    body('desc'),
    body('category'),
    body('comment'),
    fileUploads.single('image'),
  ],
  updateMading
);

router.delete('/:id', protect, deleteMading);
router.get('/:id', getMading);
router.get('/', getAllMading);

module.exports = router;
