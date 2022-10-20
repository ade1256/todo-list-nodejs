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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', routes)

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});