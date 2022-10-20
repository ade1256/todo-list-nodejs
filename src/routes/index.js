const express = require('express');
const authorization = require('../middlewares/authorization');
const Router = express.Router();

const todo = require('./todo.route');
const user = require('./user.route');

Router
  .use('/user', user)
  .use('/todo', authorization, todo)

module.exports = Router;
