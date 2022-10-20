const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

module.exports = {
  createUser
}