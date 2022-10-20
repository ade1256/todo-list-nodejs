const express = require('express');
const Route = express.Router();
const controller = require('../controllers/todo.controller');

Route
.get('/', controller.getAll)
.post('/', controller.createTodo)
.put('/:todoId', controller.updateById)
.delete('/:todoId', controller.deleteById)

module.exports = Route