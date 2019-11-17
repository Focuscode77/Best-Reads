var express = require("express");
var passport = require("./config/passport");


var PORT = process.env.PORT || 8080;

var app = express();


app.use(express.static("public"));


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(passport.initialize());

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Hi
console.log("OMG!")
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});