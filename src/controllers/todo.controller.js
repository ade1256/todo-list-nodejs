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

const getAll = (req, res) => {
  Todo.find().populate({
    path: 'user',
    match: { _id: req.userId },
    select: 'name email username'
  })
    .then(todos => {
      res.send(todos);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos."
      });
    });
}

const getById = (req, res) => {
  Todo.findById(req.params.todoId).populate({
    path: 'user',
    match: { _id: req.userId },
    select: 'name email username'
  })
    .then(async todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send(todo);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      return res.status(500).send({
        message: "Error retrieving todo with id " + req.params.todoId
      });
    });
}

const updateById = (req, res) => {
  Todo.findByIdAndUpdate(req.params.todoId, {
    title: req.body.title,
    isCompleted: req.body.isCompleted
  }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send(todo);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      return res.status(500).send({
        message: "Error updating todo with id " + req.params.todoId
      });
    });
}

const deleteById = (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      res.send({ message: "Todo deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.todoId
        });
      }
      return res.status(500).send({
        message: "Could not delete todo with id " + req.params.todoId
      });
    });
}

module.exports = {
  createTodo, getAll, updateById, deleteById, getById
}