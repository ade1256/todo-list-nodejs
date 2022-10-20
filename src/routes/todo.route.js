const express = require('express');
const Route = express.Router();
const controller = require('../controllers/todo.controller');

Route
.get('/', controller.getAll)
.get('/:todoId', controller.getById)
.post('/', controller.createTodo)
.put('/:todoId', controller.updateById)
.delete('/:todoId', controller.deleteById)

module.exports = Route