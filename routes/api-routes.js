const CsvDb = require('csv-db');
const csvDb = new CsvDb('book_db.csv');
var passport = require("../config/passport");
var xmlConvert = require("xml-js");
var db = require("../models");
var fetch = require("node-fetch");
var Puid = require("puid");
var fs = require("fs")
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
            console.log(dbResult[0])
            if (dbResult[0]) {
              db.users.findAll({
                where: {
                  id: dbResult[0].id
                }
              }).then(dbResult => {

                profile = new userProfile(dbResult[0].id, dbResult[0].name, dbResult[0].username, dbResult[0].email, dbResult[0].dob, dbResult[0].pictureURL, req.session.passport.user.provider, req.session.passport.user._json.sub);
                console.log(req.session.passport.user._json && profile);
                res.redirect("/")
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
          console.log(dbResult[0])
          if (dbResult[0]) {
            db.users.findAll({
              where: {
                id: dbResult[0].id
              }
            }).then(dbResult => {
              profile = new userProfile(dbResult[0].id, dbResult[0].name, dbResult[0].username, dbResult[0].email, dbResult[0].dob, dbResult[0].pictureURL, req.session.passport.user.provider, req.session.passport.user._json.user_id)
              console.log(req.session.passport.user._json && profile);
              res.redirect("/")
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
  app.get("/api/add/:book/:cat", function (req, res) {
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
  app.get("/api/mylist/current", function (req, res) {
    if (req.session.passport) {
      db.reads_lists.findAll({
        where: {
          user_id: profile.uid,
          cat: 1
        }
      }).then(data => {
        res.json(data)
      })
    }
  })
  app.get("/api/mylist/past", function (req, res) {
    if (req.session.passport) {
      db.reads_lists.findAll({
        where: {
          user_id: profile.uid,
          cat: 2
        }
      }).then(data => {
        res.json(data)
      })
    }
  })
  app.get("/api/mylist/future", function (req, res) {
    if (req.session.passport) {
      db.reads_lists.findAll({
        where: {
          user_id: profile.uid,
          cat: 3
        }
      }).then(data => {
        res.json(data)
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
          console.log(req.session.passport.user._json && profile);
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
          console.log(req.session.passport.user._json && profile);
          res.redirect("/")
        })
      })
    })
  });
  app.get("/user/profile", (req, res) => {
    if (profile) {
      res.render("pages/profile")
    } else {
      res.redirect("/")
    }
  });
  app.get("/user", (req, res) => {
    if (req.session.passport) {
      res.json(profile);
    } else {
      res.json(false)
    }
  })


  app.get("/xmltest2/:result", (req, res) => {
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
            console.log(book.get({
              plain: true
            }))
            console.log(created)
          })
          books.work.push(book);
        }
        res.json(books);
      })
  });

  app.get("/xmltest", (req, res) => {
    var queryURL =
      "https://www.goodreads.com/search/index.xml?key=ntj35uAln93Ca74x0mChdA&q=Madeline";

    fetch(queryURL)
      .then(response => response.text())
      .then(data => {

        var fullJson = xmlConvert.xml2js(data, {
          compact: false,
          spaces: 4
        });
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
      // res.json(req.user.displayName)
    }
  );

  app.get("/api/user/:id", function (req, res) {
    // 2; Add a join to include all of the User's Lists here
    db.readlists.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });






};