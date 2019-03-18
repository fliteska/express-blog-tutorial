const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/dynamic/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

router.post('/post-it', (req, res) => {
    res.send(`${req.body.title}: ${req.body.content}`);
});

router.get('/form', (req, res) => {
    res.render('index');
});

router.post('/form', (req, res) => {
    res.render('index', {
        title: req.body.title,
        content: req.body.content,
    });
});

module.exports = router;