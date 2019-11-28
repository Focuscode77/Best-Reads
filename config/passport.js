var passport = require("passport");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
var AmazonStrategy = require("passport-amazon").Strategy;
passport.use(

    new GoogleStrategy({
            clientID: "735153275618-0f4o2cvlel20sq2cu1udpn8hsts8c2g9.apps.googleusercontent.com",
            clientSecret: "M3Nse2YiHHNsr_Qv03xuRZD-",
            callbackURL: "http://localhost:8080/auth/google/callback"
            // callbackURL: "https://floating-plains-34399.herokuapp.com/auth/google/callback"

        },
        function (accessToken, refreshToken, profile, cb) {
            cb(null, profile);
        }
    )
);

passport.use(
    new AmazonStrategy({
            clientID: "amzn1.application-oa2-client.752db9a171d94386bc9b4a16035a436b",
            clientSecret: "f7df7e1ca4441d6f52bfe36c75bffd66b8e4911af1f50f85d2e246a8fbb8b915",
            callbackURL: "http://localhost:8080/auth/amazon/callback"
            // callbackURL: "https://floating-plains-34399.herokuapp.com/auth/amazon/callback"


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