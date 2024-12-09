// src/controllers/auth.controller.js
const bcrypt = require('bcrypt');
const { users } = require('../config/database');

class AuthController {
    static renderLoginPage(req, res) {
        if (req.session.authenticated) {
            return res.redirect('/content');
        }
        res.render('login', { error: null });
    }

    static async handleLogin(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.render('login', {
                    error: 'Veuillez remplir tous les champs'
                });
            }

            const user = users.find(u => u.username === username);
            
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.render('login', {
                    error: 'Nom d\'utilisateur ou mot de passe incorrect'
                });
            }

            req.session.authenticated = true;
            req.session.username = username;
            res.redirect('/content');
        } catch (error) {
            console.error('Erreur de connexion:', error);
            res.render('login', {
                error: 'Une erreur est survenue lors de la connexion'
            });
        }
    }

    static handleLogout(req, res) {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    console.error('Erreur de déconnexion:', err);
                    return res.status(500).render('error', {
                        message: 'Erreur lors de la déconnexion',
                        error: err
                    });
                }
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    }
}

module.exports = AuthController;