const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
	title: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  isCompleted: {type: Boolean, required: true}
},{
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;