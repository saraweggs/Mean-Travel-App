const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const travelsController = require('./controllers/travels.js');
app.use('/travels', travelsController);

app.get('/', (req,res) => {
    res.send('hello world');
});

app.listen(3000, () => {
    console.log('listening on port 3000...');
});
