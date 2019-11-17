var passport = require("passport");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy({
            clientID: "735153275618-0f4o2cvlel20sq2cu1udpn8hsts8c2g9.apps.googleusercontent.com",
            clientSecret: "M3Nse2YiHHNsr_Qv03xuRZD-",
            callbackURL: "http://localhost:8080/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
            cb(null, profile);
        }
    )
);
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;