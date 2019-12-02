var path = require("path");

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('index', {
            layout: 'splash.handlebars'
        });
    });

    app.get('/home', function (req, res, next) {
        res.render('pages/home');
    });

    app.get('/current-book', function (req, res, next) {
        res.render('pages/current-book');
    });

    app.get('/advanced', function (req, res, next) {
        res.render('pages/advanced-search');
    });

    app.get('/mylists', function (req, res, next) {
        res.render('pages/my-lists');
    });

    app.get('/profile', function (req, res, next) {
        res.render('pages/my-profile');
    });
    app.get('/results', function (req, res, next) {
        res.render('pages/search-results');
    });

    app.get('/mylist', function (req, res, next) {
        res.render('pages/current-list');
    });

};