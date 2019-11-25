var path = require("path");

module.exports = function (app) {
    // app.get("*", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/test.html"));
    // });
    // app.get("/test", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/test.html"));
    // });

    app.get('/', function (req, res, next) {
        res.render('index');
    });

<<<<<<< HEAD
    app.get('/home', function(req, res, next) {
=======

    app.get('/home', function (req, res, next) {
>>>>>>> master
        res.render('pages/home');
    });

    app.get('/current-book', function (req, res, next) {
        res.render('pages/current-book');
    });

<<<<<<< HEAD
=======
    app.get('/advanced', function (req, res, next) {
        res.render('pages/advanced-search');
    });
>>>>>>> master

    // app.get('/mylists', function(req, res, next) {
    //     res.render('pages/my-lists');
    // });

<<<<<<< HEAD
    app.get('/profile', function(req, res, next) {
        res.render('pages/my-profile');
=======
    // app.get('/profile', function (req, res, next) {
    //     res.render('pages/profile');
    // });

    app.get('/mylists', function (req, res, next) {
        let checker = false;
        app.get("/user", function (req, res, next) {
            if (res) {
                checker = true;
                console.log(res);
            } else {
                console.log("DELETE ME: no res")
            }
        });
        if (checker) {
            res.render('pages/home');
        } else {
            console.log("failed")
        }

    });
    app.get('/home', function (req, res, next) {
        res.render('pages/home');
>>>>>>> master
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