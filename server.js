// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');

// CONFIGURATION
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// CONTROLLERS
const travelsController = require('./controllers/travels.js');
app.use('/travels', travelsController);
const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

// LISTENER
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

// DATABASE
mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
