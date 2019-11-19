var path = require("path");

module.exports = function (app) {
    // app.get("*", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/test.html"));
    // });
    app.get("/test", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/test.html"));
    });

    app.get('/', function (req, res, next) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get('/home', function (req, res, next) {
        res.render('pages/home');
    });

};