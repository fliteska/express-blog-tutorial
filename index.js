const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bluebird = require('bluebird');
// mongoose.Promise = bluebird;
// mongoose.connect('mongodb://localhost:27017/express-blog');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');

app.use('/originals', require('./routes'));
app.use('/post', require('./db/post/routes.js'));

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
