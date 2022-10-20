const express = require('express');
const Router = express.Router();

const todo = require('./todo.route');

Router
  .use('/todo', todo)

module.exports = Router;
