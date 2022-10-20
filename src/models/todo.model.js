const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
	title: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  isCompleted: {type: Boolean, required: true}
},{
  timestamps: true
})

todoSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})
todoSchema.set('toObject', { virtuals: true });
todoSchema.set('toJSON', { virtuals: true });
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;