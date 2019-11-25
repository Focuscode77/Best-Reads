var passport = require("../config/passport");
var xmlConvert = require("xml-js");
var fetch = require("node-fetch");
//testing json output
// const fs = require("fs");
// const storeData = (data, path) => {
//   try {
//     fs.writeFileSync(path, JSON.stringify(data));
//   } catch (err) {
//     console.error(err);
//   }
// };

module.exports = app => {
<<<<<<< HEAD
    app.get("/logout", (req, res) => {
        req.logout();
        req.session = null;
        res.redirect("/");
    });

    app.get("/user", (req, res) => {
        if (req.session.passport) {
            res.json({
                provider: req.session.passport.user.provider,
                name: req.session.passport.user._json.name
            });
        } else {
            res.json(false);
        }
    });

    //ALL RESULTS
    app.get("/xmltest2/:results", (req, res) => {

        var queryURL =
            "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=" + req.params.results;

        fetch(queryURL)
            .then(response => response.text())
            .then(data => {
                // data = the raw xml data
                // console.log(data);
                var compactJson = xmlConvert.xml2js(data, {
                    compact: true,
                    spaces: 4
                });
                // console.log(compactJson);
                // storeData(compactJson, "./compactJSON.txt");
                res.json(compactJson);
            });
    });

    app.get("/xmltest", (req, res) => {
        var queryURL =
            "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=Madeline";

        fetch(queryURL)
            .then(response => response.text())
            .then(data => {
                // data = the raw xml data
                // console.log(data);

                var fullJson = xmlConvert.xml2js(data, {
                    compact: false,
                    spaces: 4
                });
                // console.log(fullJson);
                // storeData(fullJson, "./fullJSON.txt");
                res.json(fullJson);
            });
    });

    app.get("/google-books/all/:query", (req, res) => {
        var queryURL =
            "https://www.googleapis.com/books/v1/volumes?q=" + req.params.query + "&key=AIzaSyD8EEi7FPMPI6kEQFzxN31RdNWqHc7rHGQ";

        fetch(queryURL)
            .then(data => {
                console.log(data);
                res.json(data[0]);
            });
    });

    app.get("/google-books/title/:query", (req, res) => {
        var queryURL =
            "https://www.googleapis.com/books/v1/volumes?q=intitle:" + req.params.query + "&key=AIzaSyD8EEi7FPMPI6kEQFzxN31RdNWqHc7rHGQ";

    });

    app.get("/google-books/author/:query", (req, res) => {
        var queryURL =
            "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + req.params.query + "&key=AIzaSyD8EEi7FPMPI6kEQFzxN31RdNWqHc7rHGQ";

    });

    app.get("/google-books/isbn/:query", (req, res) => {
        var queryURL =
            "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.params.query + "&key=AIzaSyD8EEi7FPMPI6kEQFzxN31RdNWqHc7rHGQ";

    });

    app.get(
        "/auth/amazon",
        passport.authenticate("amazon", {
            scope: ["profile"]
        })
    );

    app.get(
        "/auth/amazon/callback",
        passport.authenticate("amazon", {
            failureRedirect: "/"
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect("/");
        }
    );
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile"]
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google", {
            failureRedirect: "/"
        }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect("/");
            // res.json(req.user.displayName)
        }
    );
=======
  app.get("/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.redirect("/");
  });

  app.get("/user", (req, res) => {
    if (req.session.passport) {
      switch (req.session.passport.user.provider) {
        case "google": {
          res.json({
            provider: req.session.passport.user.provider,
            provider_id: req.session.passport.user._json.sub,
            name: req.session.passport.user._json.name,
            picture: req.session.passport.user._json.picture
          });
        }
        break;
      case "amazon": {
        res.json({
          provider: req.session.passport.user.provider,
          provider_id: req.session.passport.user._json.user_id,
          name: req.session.passport.user._json.name,
          email: req.session.passport.user._json.email
        });
      }
      break;
      }

    } else {
      res.json(false);
    }
  });
  app.get("/xmltest2", (req, res) => {
    var queryURL =
      "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=Madeline";

    fetch(queryURL)
      .then(response => response.text())
      .then(data => {
        // data = the raw xml data
        // console.log(data);
        var compactJson = xmlConvert.xml2js(data, {
          compact: true,
          spaces: 4
        });
        // console.log(compactJson);
        // storeData(compactJson, "./compactJSON.txt");
        res.json(compactJson);
      });
  });

  app.get("/xmltest", (req, res) => {
    var queryURL =
      "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=Madeline";

    fetch(queryURL)
      .then(response => response.text())
      .then(data => {
        // data = the raw xml data
        // console.log(data);

        var fullJson = xmlConvert.xml2js(data, {
          compact: false,
          spaces: 4
        });
        // console.log(fullJson);
        // storeData(fullJson, "./fullJSON.txt");
        res.json(fullJson);
      });
  });

  app.get(
    "/auth/amazon",
    passport.authenticate("amazon", {
      scope: ["profile"]
    })
  );

  app.get(
    "/auth/amazon/callback",
    passport.authenticate("amazon", {
      failureRedirect: "/"
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/"
    }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/");
      // res.json(req.user.displayName)
    }
  );
>>>>>>> master
};