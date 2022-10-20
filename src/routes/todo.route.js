const express = require('express');
const Route = express.Router();
const controller = require('../controllers/todo.controller');

Route
.post('/', controller.createTodo)

module.exports = Route