const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
    name: req.body.name,
    email: req.body.email
  });

  // Save User in the database
  user
    .save()
    .then(async data => {
      let result = (data._doc)
      delete result.password
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
}

const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password)
    if (result) {
      let newUser = user._doc
      delete newUser.password
      jwt.sign({...newUser}, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: "6h" }, (error, token) => {
        if(error) {
          return res.status(500).json({message: error.message});
        }
        res.send({...newUser, token})
      });
      
    } else {
      res.status(401).send({
        message: "Invalid Password"
      })
    }
  } else {
    res.status(404).send({
      message: "User not found"
    })
  }
}

module.exports = {
  createUser, loginUser
}