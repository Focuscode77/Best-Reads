var passport = require("../config/passport");


module.exports = function (app) {
    app.get('/auth/google',
        passport.authenticate('google', {

            scope: ['profile']
        }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            // Successful authentication, redirect home.
            console.log(res)
            res.redirect('/');
        });
}