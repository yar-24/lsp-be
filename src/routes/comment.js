const express = require('express');
const router = express.Router();

const {
  createComment,
  getAllComments,
  deleteComment,
} = require('../controllers/comment');
const { protect } = require('../middleware/protectAdmin');

router.post('/', protect, createComment);
router.get('/', getAllComments);
router.delete('/:id', protect, deleteComment);

module.exports = router;
