var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bookRouter = express.Router();

var nav = [{Link:'/Books', Text: 'Books'}
          ,{Link:'/Authors', Text: 'Authors'}
          ,{Link:'/Pudding', Text: 'Pudding'}
          ];

app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

bookRouter.route('/')
    .get(function(req, res) {
        res.render('books', {nav});
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('hello Book');
    });

app.use('/Books', bookRouter);

app.get('/',function(req, res) {res.render('index', {nav});});

/*
app.get('/Books',function(req,res) {
    res.send('zzzzzHello Books');
});  */

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
