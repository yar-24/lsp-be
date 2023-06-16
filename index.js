const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();

const routeUser = require('./src/routes/users');
const routeMading = require('./src/routes/mading');
const routeComment = require('./src/routes/comment');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB success connect'))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/users', routeUser);
app.use('/mading', routeMading);
app.use('/comment', routeComment);

app.listen(process.env.PORT || 5000, () => {
  console.log('backend server running');
});
