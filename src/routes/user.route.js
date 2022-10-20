const express = require('express');
const Route = express.Router();
const controller = require('../controllers/user.controller');

Route
.post('/register', controller.createUser)

module.exports = Route