var express = require("express");
var cookieSession = require("cookie-session");
var passport = require("./config/passport");
var PORT = process.env.PORT || 8080;

var app = express();

var db = require("./models");

app.use(express.static("public"));

//handlebars - initialize handlebars and create routes
var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(
  cookieSession({
    name: "BestReads",
    keys: [
      "484af53583463faaf38e407eccb84107",
      "ea9d53b7d78ffebcc03416aaad4685c1",
      "b0d3a8c8cde1091f271a64b857beb0c6",
      "1f75f56f493e4641bbe3c59d4c8d4d64",
      "6c3600607c7566ac7c1a1e5e7e2f22a3"
    ],
    maxAge: 24 * 60 * 60 * 1000
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);
require("./routes/post-api-routes")(app);

// Hi
console.log("OMG!");

db.sequelize
  .sync({
    force: true
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
  });