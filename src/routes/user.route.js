const express = require('express');
const Route = express.Router();
const controller = require('../controllers/user.controller');

Route
.post('/register', controller.createUser)
.post('/login', controller.loginUser)

module.exports = Route