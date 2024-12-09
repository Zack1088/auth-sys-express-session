// src/app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const sessionConfig = require('./config/session.config');
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');

const app = express();

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

// Routes
app.use('/', authRoutes);
app.use('/', contentRoutes);

// Gestion des erreurs
app.use((req, res, next) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;