var path = require("path");

module.exports = function (app) {
    app.get("/", function (req, res) {
        console.log(req.user && req.user.name.givenName);
        res.sendFile(path.join(__dirname, "../public/test.html"));
    });
    app.get("/test", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/test.html"));
    });
};