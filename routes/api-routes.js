var passport = require("../config/passport");
var xmlConvert = require("xml-js");
var fetch = require("node-fetch");

module.exports = function(app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  app.get("/logout", function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  });

  app.get("/user", function(req, res) {
    if (req.session.passport) {
      res.json(req.session.passport.user.displayName);
    } else {
      res.json(false);
    }
  });
  app.get("/xmltest2", function(req, res) {
    var queryURL =
      "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=Madeline";

    fetch(queryURL)
      .then(response => response.text())
      .then(data => {
        // data = the raw xml data
        // console.log(data);
        var compactJson = xmlConvert.xml2json(data, {
          compact: true,
          spaces: 4
        });
        console.log(compactJson);
        res.send(compactJson);
      });
  });

  app.get("/xmltest", function(req, res) {
    var queryURL =
      "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=Madeline";

    fetch(queryURL)
      .then(response => response.text())
      .then(data => {
        // data = the raw xml data
        // console.log(data);

        var fullJson = xmlConvert.xml2json(data, {
          compact: false,
          spaces: 4
        });
        console.log(fullJson);
        res.send(fullJson);
      });
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/"
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/test");
      // res.json(req.user.displayName)
    }
  );
};
