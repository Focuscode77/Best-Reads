var path = require("path");

module.exports = function(app) {
    // app.get("*", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/test.html"));
    // });
    // app.get("/test", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/test.html"));
    // });

    app.get('/', function(req, res, next) {
        res.render('index');
    });

    app.get('/home', function(req, res, next) {
        res.render('pages/home');
    });

    app.get('/current-book', function(req, res, next) {
        res.render('pages/current-book');
    });


    app.get('/mylists', function(req, res, next) {
        res.render('pages/my-lists');
    });

    app.get('/profile', function(req, res, next) {
        res.render('pages/my-profile');
    });

    app.get('/results', function(req, res, next) {
        res.render('pages/search-results');
    });

    app.get('/currentbook', function(req, res, next) {
        res.render('pages/current-book');
    });

    app.get('/test', function(req, res, next) {
        res.render('pages/test');
    });

};