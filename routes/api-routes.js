var passport = require("../config/passport");
var xmlConvert = require("xml-js");
var fetch = require("node-fetch");
var Puid = require("puid");
var puid = new Puid('');
var profile = false;
//testing json output
// const fs = require("fs");
// const storeData = (data, path) => {
//   try {
//     fs.writeFileSync(path, JSON.stringify(data));
//   } catch (err) {
//     console.error(err);
//   }
// };
function userProfile(name, username, email, dob, pictureURL, provider, provider_id) {
  this.name = name;
  this.username = username;
  this.email = email;
  this.dob = dob;
  this.pictureURL = pictureURL;
  this.provider = provider;
  this.provider_id = provider_id;
}
module.exports = app => {
  app.get("/logout", (req, res) => {
    req.logout();
    req.session = null;
    profile = false;
    res.redirect("/");
  });
  app.get("/login", (req, res) => {


  });
  app.get("/user", (req, res) => {
    res.json(profile);
  })


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
      profile = new userProfile(req.session.passport.user._json.name, puid.generate(), req.session.passport.user._json.email, null, null, req.session.passport.user.provider, req.session.passport.user._json.user_id);

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
      profile = new userProfile(req.session.passport.user._json.name, puid.generate(), null, null, req.session.passport.user._json.picture, req.session.passport.user.provider, req.session.passport.user._json.sub);
      res.redirect("/");
      // res.json(req.user.displayName)
    }
  );
};