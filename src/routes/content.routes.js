// src/routes/content.routes.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');

router.get('/content', requireAuth, (req, res) => {
  res.render('content', { username: req.session.username });
});

module.exports = router;