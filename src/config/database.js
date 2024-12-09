// src/config/database.js

const bcrypt = require('bcrypt');

const users = [
  { username: 'user1', password: bcrypt.hashSync('password1', 10) },
  { username: 'user2', password: bcrypt.hashSync('password2', 10) }
];

module.exports = { users };