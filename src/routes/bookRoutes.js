var express = require('express');

var bookRouter = express.Router();

var books = [
    {
        title:'Books 1',
        genre:'history',
        author:'author 1',
        read:false
    } ,
    {
        title:'Books 2',
        genre:'history',
        author:'author 2',
        read:false
    } ,
    {
        title:'Books 3',
        genre:'history',
        author:'author 3',
        read:false
    }
];

bookRouter.route('/').get(function (req, res) {res.render('books',{title: ' Books', nav:[
    {Link:'/Books', Text: 'Books'}
    ,{Link:'/Authors',Text: 'Authors'}
    ,{Link:'/Pudding', Text: 'Pudding'}]
    ,books: books});
});

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('hello Book');
    });

module.exports = bookRouter;