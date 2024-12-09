// src/config/session.config.js
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const fs = require('fs');

// Création du dossier sessions s'il n'existe pas
const sessionsDir = path.join(process.cwd(), 'sessions');
if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true });
}

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        path: sessionsDir,
        ttl: 86400, // 1 jour
        reapInterval: 3600, // Nettoyage toutes les heures
        retries: 0, 
        logFn: function(){}, 
        encoding: 'utf8'
    }),
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 jour
    }
};

module.exports = sessionConfig;