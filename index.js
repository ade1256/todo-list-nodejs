require('dotenv').config();
require('./src/configs/db.config');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const routes = require('./src/routes');

const ORIGIN = process.env.ORIGIN || '*';

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', routes)

app.get("/", (req, res) => {
  res.send({
    author: "https://github.com/ade1256",
    name: "todo-list-nodejs",
    version: "1.0.0",
    description: "todolist build with nodes",
    repository: "https://github.com/ade1256/todo-list-nodejs.git",
    message: "Welcome to the API TODO LIST, read documentation for more information.",
    documentation: "https://documenter.getpostman.com/view/4097379/2s847MrWKe"
  })
})

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});