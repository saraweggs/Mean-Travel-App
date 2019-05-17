const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');


app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'feedmeseymour',
  resave: false,
  saveUninitialized: false
}));

const travelsController = require('./controllers/travels.js');
app.use('/travels', travelsController);

app.get('/', (req,res) => {
    res.send('hello world');
});

const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

app.listen(3000, () => {
    console.log('listening on port 3000...');
});

mongoose.connect('mongodb://localhost:27017/travelerr', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
});
