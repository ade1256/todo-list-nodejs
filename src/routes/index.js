const express = require('express');
const Router = express.Router();

const todo = require('./todo.route');
const user = require('./user.route');

Router
  .use('/user', user)
  .use('/todo', todo)

module.exports = Router;
