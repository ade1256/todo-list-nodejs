const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
	username: String,
	password: String,
	name: String,
	email: String
},{
  timestamps: true
})

const User = mongoose.model('User', userSchema);

userSchema.path('email').validate(async (value) => {
	const emailCount = await mongoose.models.User.countDocuments({email: value });
	return !emailCount;
}, 'Email already exists');
userSchema.path('username').validate(async (value) => {
	const count = await mongoose.models.User.countDocuments({username: value });
	return !count;
}, 'Username already exists');

module.exports = User;