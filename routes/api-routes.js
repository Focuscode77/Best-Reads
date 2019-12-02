var passport = require("../config/passport");
var xmlConvert = require("xml-js");
var db = require("../models");
var fetch = require("node-fetch");
var Puid = require("puid");
var puid = new Puid('');
var profile = false;

function userProfile(uid, name, username, email, dob, pictureURL, provider, provider_id) {
  this.uid = uid;
  this.name = name;
  this.username = username;
  this.email = email;
  this.dob = dob;
  this.pictureURL = pictureURL;
  this.provider = provider;
  this.provider_id = provider_id;
}
module.exports = function (app) {

  app.get("/logout", function (req, res) {
    req.logout();
    req.session = null;
    profile = false;
    res.redirect("/");
  });

  app.get("/login", function (req, res) {
    if (req.session.passport) {
      switch (req.session.passport.user.provider) {
        case "google": {
          db.google_uid.findAll({
            where: {
              google_uid: req.session.passport.user._json.sub
            }
          }).then(dbResult => {
            if (dbResult[0]) {
              db.users.findAll({
                where: {
                  id: dbResult[0].id
                }
              }).then(dbResult => {

                profile = new userProfile(dbResult[0].id, dbResult[0].name, dbResult[0].username, dbResult[0].email, dbResult[0].dob, dbResult[0].pictureURL, req.session.passport.user.provider, req.session.passport.user._json.sub);
                res.redirect("/home")
              })
            } else {
              res.redirect("/create/google")
            }
          })

        }
        break;
      case "amazon": {
        db.amazon_uid.findAll({
          where: {
            amazon_uid: req.session.passport.user._json.user_id
          }
        }).then(dbResult => {
          if (dbResult[0]) {
            db.users.findAll({
              where: {
                id: dbResult[0].id
              }
            }).then(dbResult => {
              profile = new userProfile(dbResult[0].id, dbResult[0].name, dbResult[0].username, dbResult[0].email, dbResult[0].dob, dbResult[0].pictureURL, req.session.passport.user.provider, req.session.passport.user._json.user_id)
              res.redirect("/home")
            })
          } else {
            res.redirect("/create/amazon")
          }
        })
      }
      break;
      default:
        res.redirect("/logout")

      }
    }
  });

  app.post("/api/add/:book/:cat", function (req, res) {
    if (req.session.passport) {
      db.reads_lists.create({
        user_id: profile.uid,
        book_id: req.params.book,
        cat: req.params.cat
      }).then(() => {
        res.json("something happened");
      });
    } else {
      res.json("nothing happened")
    }
  });
  app.get("/api/mylist/:list_name", function (req, res) {
    var books = {
      work: []
    };
    var name = req.params.list_name
    var cat;
    if (req.session.passport) {
      switch (name) {
        case "current": {
          cat = 1
        }
        break;
      case "past": {
        cat = 2
      }
      break;
      case "future": {
        cat = 3
      }
      break;
      default:
        res.redirect("/logout")
      }
      db.reads_lists.findAll({
        where: {
          user_id: profile.uid,
          cat: cat
        },
        include: [db.books]
      }).then(dbResult => {
        dbResult.forEach((element) => {
          books.work.push(element.book)
        })
        res.json(books)
      })
    }
  })

  app.get("/create/google", (req, res) => {
    db.google_uid.create({
      google_uid: req.session.passport.user._json.sub
    }).then(() => {
      db.amazon_uid.create({
        amazon_uid: ""
      }).then(() => {
        db.users.create({
          name: req.session.passport.user._json.name,
          username: puid.generate(),
          email: "",
          dob: 000000,
          pictureURL: req.session.passport.user._json.picture
        }).then(dbResult => {
          profile = new userProfile(dbResult.id, dbResult.name, dbResult.username, dbResult.email, dbResult.dob, dbResult.pictureURL, req.session.passport.user.provider, req.session.passport.user._json.sub);
          res.redirect("/")
        })
      })
    })
  });

  app.get("/create/amazon", (req, res) => {
    db.amazon_uid.create({
      amazon_uid: req.session.passport.user._json.user_id
    }).then(() => {
      db.google_uid.create({
        google_uid: ""
      }).then(() => {
        db.users.create({
          name: req.session.passport.user._json.name,
          username: puid.generate(),
          email: req.session.passport.user._json.email,
          dob: 000000,
          pictureURL: ""
        }).then(dbResult => {
          profile = new userProfile(dbResult.id, dbResult.name, dbResult.username, dbResult.email, dbResult.dob, dbResult.pictureURL, req.session.passport.user.provider, req.session.passport.user._json.user_id)
          res.redirect("/")
        })
      })
    })
  });

  app.get("/user", (req, res) => {
    if (req.session.passport) {
      res.json(profile);
    } else {
      res.json(false)
    }
  });

  app.get("/search/:result", (req, res) => {
    var books = {
      work: []
    };
    var queryURL =
      "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=" + req.params.result;
    fetch(queryURL)
      .then(response => response.text())
      .then(data => {
        var compactJson = xmlConvert.xml2js(data, {
          compact: true,
          spaces: 4
        });
        for (var i = 0; i < 20; i++) {
          var book = {
            title: compactJson.GoodreadsResponse.search.results.work[i].best_book.title._text,
            author: compactJson.GoodreadsResponse.search.results.work[i].best_book.author.name._text,
            rating: compactJson.GoodreadsResponse.search.results.work[i].average_rating._text,
            image: compactJson.GoodreadsResponse.search.results.work[i].best_book.image_url._text,
            book_id: compactJson.GoodreadsResponse.search.results.work[i].best_book.id._text
          };
          db.books.findOrCreate({
            where: {
              book_id: book.book_id
            },
            defaults: {
              title: compactJson.GoodreadsResponse.search.results.work[i].best_book.title._text,
              author: compactJson.GoodreadsResponse.search.results.work[i].best_book.author.name._text,
              rating: compactJson.GoodreadsResponse.search.results.work[i].average_rating._text,
              image: compactJson.GoodreadsResponse.search.results.work[i].best_book.image_url._text
            }
          }).then(([book, created]) => {
            // book.get({
            //   plain: true
            // })
          })
          books.work.push(book);
        }
        res.json(books);
      })
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
      res.redirect("/login");
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
    function (req, res) {
      res.redirect("/login");
    }
  );

};