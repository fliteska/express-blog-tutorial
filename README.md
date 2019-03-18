# Instructions

1. mkdir express-blog
2. cd express-blog
3. Configure NPM with defaults `npm init -y`
4. Install Express: `npm i --save express`
5. Install Hot Reloading `npm i --save-dev nodemon`
6. Update `package.json` scripts: `"start": "nodemon index.js"`
7. Create `index.js`
8. Set up base application

``` javascript
const express = require('express');
const app = express();
/*
    TODO: Add Application Code
*/
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
```

9. Add your first route

``` javascript
app.get('/', (req, res) => {
    res.send('Ryan is awesome!');
});
```

10. Open http://localhost:3000 in your browser
11. Add your first dynamic route

``` javascript
app.get('/dynamic/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});
```

12. Install dependencies for forms: `npm i --save body-parser`
13. Use `body-parser`

``` javascript
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

14. Add your first post route

``` javascript
app.post('/post-it', (req, res) => {
    res.send(`${req.body.title} is ${req.body.content}`);
});
```

15. Use postman / Insomnia to access the page
16. Add a view engine `npm i --save pug`
17. Use view engine
``` javascript
app.set('view engine', 'pug');
```
18. Create `views` directory
19. Create your first view `views/index.pug`

``` pug
html
    head
        title My cool website
    body
        form(method="POST")
            input(name="title")
            textarea(name="content")
            button Submit
        
        div #{title}: #{content}
```

19. Create 2 routes

``` javascript
app.get('/form', (req, res) => {
    res.render('index');
});
app.post('/form', (req, res) => {
    res.render('index', {
        title: req.body.title,
        content: req.body.content,
    });
});
```

20. Try the form in the browser
21. Create a file for your routes `routes.js`
22. Remove the `app.get` and `app.post` functions from `index.js`
23. Add them to `routes.js`

``` javascript
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
```

24. Add `routes.js` to the application
``` javascript
app.use('/originals', require('./routes.js'));
```

25. View your routes
26. Install MongoDB dependencies: `npm i --save mongoose bluebird mongoose-paginate`
27. Configure Mongoose

``` javascript
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost:27017/express-blog');
```

28.  Create your first model `db/post/model.js`

``` javascript
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    title: String,
    content: String,
});

schema.plugin(paginate);

module.exports = mongoose.model('Post', schema);
```

29. Create routes for your model `db/post/routes.js`

``` javascript
const express = require('express');
const router = express.Router();
const model = require('./model');

router.get('/create', (req, res) => {
    res.render('post/create');
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
            res.render('post/view', {
                data,
            });
        });
});

router.get('/:id/edit', (req, res) => {
    model.findById(req.params.id)
        .then((data) => {
            res.render('post/create', {
                data,
            });
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
```

30.  Create view for single post `views/post/view.pug`

``` pug
html
    head
        title #{title} | Posts
        link(href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', rel='stylesheet')
    body
        div.container
            div.row
                div.col-6
                    h1 #{title}
                div.col-6.text-right
                    a(href='/post/', class='btn btn-secondary') Back
                    a(href='/post/' + _id + '/edit', class='btn btn-primary') Edit
            div.row
                div.col-12
                    p #{content}

        script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js')
```

31. Create view for creating/editing post `views/post/form.pug`

``` pug
html
    head
        title #{title} | Posts
        link(href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', rel='stylesheet')
    body
        div.container
            div.row
                div.col-6
                    h1 Post Editor
                div.col-6.text-right
                    a(href='/post/' + _id, class='btn btn-secondary') Back
            div.row
                div.col-12
                    form(method='POST')
                        div.form-group
                            label(for='title')
                            input(type='text', class='form-control', name='title', value=title)
                        div.form-group
                            label(for='content')
                            textarea(type='text', class='form-control', name='content') #{content}
                        button.btn.btn-primary Submit

        script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js')
```

32. Create view for listing posts `views/post/list.pug`

``` pug
html
    head
        title Posts
        link(href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', rel='stylesheet')
    body
        div.container
            div.row
                div.col-6
                    h1 Posts
                div.col-6.text-right
                    a(href='/post/create', class='btn btn-primary') Create
            div.row
                each post in data
                    div.col-md-4
                        div.card
                            div.card-body
                                h5.card-title #{post.title}
                                p.card-text
                                    a(href='/post/' + post._id) View
                script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js')
```

33. Add `db/post/routes.js` to the application

``` javascript
    app.use('/post', require('./db/post/routes.js'));
```

34. View your creation in the browser
35. Create `.gitignore` file

``` .gitignore
node_modules
```

36. Create `.env` file

``` .env
PORT=3000
MONGO_URL=http://localhost:27017/express-blog
```

37. Update `index.js` with environment variables

``` javascript
const express = require('express');
const app = express();

const { MONGO_URL, PORT } = process.env;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
mongoose.connect(MONGO_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');

app.use('/originals', require('./routes'));
app.use('/post', require('./db/post/routes.js'));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

```