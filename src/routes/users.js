const express = require('express');
const router = express.Router();

const { register, login, deleteUser } = require('../controllers/user');
const { protect } = require('../middleware/protectAdmin');

router.post('/register', register);
router.post('/login', login);
router.delete('/:id', protect, deleteUser);

module.exports = router;
