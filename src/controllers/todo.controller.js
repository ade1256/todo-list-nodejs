const Todo = require('../models/todo.model.js');
const mongoose = require('mongoose');

const createTodo = (req, res) => {
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    userId: req.body.userId,
    isCompleted: false
  });

  // Save Todo in the database
  todo
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });
}

module.exports = {
  createTodo
}