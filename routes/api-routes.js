var passport = require("../config/passport");

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

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login"
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
};
