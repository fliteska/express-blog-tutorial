const express = require('express');
const router = express.Router();
const model = require('./model');

router.get('/create', (req, res) => {
    res.render('post/form');
});

router.post('/create', (req, res) => {
    const { title, content } = req.body;
    const post = new model({
        title,
        content,
    });
    post.save()
        .then((data) => {
            res.redirect(`/post/${data._id}`);
        });
});

router.get('/:id', (req, res) => {
    model.findById(req.params.id)
        .then((data) => {
            res.render('post/view', data);
        });
});

router.get('/:id/edit', (req, res) => {
    model.findById(req.params.id)
        .then((data) => {
            res.render('post/form', data);
        });
});

router.post('/:id/edit', (req, res) => {
    const { title, content } = req.body;
    model.findByIdAndUpdate(req.params.id, {
        title,
        content,
    }).then((data) => {
        res.redirect(`/post/${req.params.id}`);
    });
});

router.get('/', (req, res) => {
    model.find({})
        .then((data) => {
            res.render('post/list', {
                data,
            });
        });
});

module.exports = router;
