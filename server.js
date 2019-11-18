var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));

//handlebars - initialize handlebars and create routes
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(
  session({ secret: "BestReads", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
