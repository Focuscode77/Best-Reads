var passport = require("../config/passport");

module.exports = function (app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  app.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  });

  app.get("/user", function (req, res) {
    if (req.session.passport) {
      res.json(req.session.passport.user.displayName);
    } else {
      res.json(false)
    }
  });


  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/"
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
      // res.json(req.user.displayName)
    }
  );
};