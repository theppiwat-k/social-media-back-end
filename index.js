const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { unless } = require('express-unless');
require('dotenv').config();

const auth = require('./middlewares/auth.js');
const errors = require('./middlewares/errors.js');

const app = express({ extends: false });
const bodyParser = require('body-parser');
const { DB,PORT } = process.env;
mongoose.Promise = global.Promise;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log('Database connected');
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

app.use(cors());
// https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json Recheck me please

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: '/users/login', methods: ['POST'] },
      { url: '/users/register', methods: ['POST'] },
    ],
  })
);

app.use(express.json());
const users = require('./routes/users.routes');
const posts = require('./routes/posts.routes');
app.use(express.urlencoded({ extended: false }));

// initialize routes
app.use('/users', users);
app.use('/posts', posts);

// 404
app.use((req, res) => {
  res.status(404).send({ error: '404 Not found' });
});

// middleware for error responses
app.use(errors.errorHandler);

// listen for requests
app.listen(PORT || 4000, function () {
  console.log(`Ready to Go! PORT = ${PORT}`);
});
