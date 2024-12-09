// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.get('/', AuthController.renderLoginPage);
router.post('/login', AuthController.handleLogin);
router.get('/logout', AuthController.handleLogout);

module.exports = router;

