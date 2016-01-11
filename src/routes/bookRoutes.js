var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
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

    bookRouter.route('/').get(function (req, res) {res.render('bookListView',{title: ' Books', nav:nav
        ,books: books});
    });

    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;

            res.render('bookView',{title: ' Books', nav:nav
                ,book: books[id]
            });
        });
    return bookRouter;
};

module.exports = router;