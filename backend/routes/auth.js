const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.post('/logout', auth, authController.logout);
router.get('/me', auth, authController.getMe);
router.put('/theme', auth, authController.updateTheme);
router.put('/ui-settings', auth, authController.updateUiSettings);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;