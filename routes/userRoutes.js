const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.delete('/profile', authenticateToken, userController.deleteAccount);

module.exports = router;
