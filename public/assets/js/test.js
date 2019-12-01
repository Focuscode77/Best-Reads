$(document).ready(function(req, res) {
    var displayBody = $("#display")
    var linksBody = $("#linkz")
    var loginGoogle = $("#login-google")
    var loginAmazon = $("#login-amazon")
    var userGreeting = $("#username");

    var logoutLink = $("#logout")
    logoutLink.detach();
    // console.log("Yo i ran made them vars!");
    // loginLink.on("click", () => {
    $.get("/user").then(function(data) {
        if (data) {
            console.log(data);
            var userObject = displayBody.text("Welcome: " + data.name + "\nLogged in thru: " + data.provider);

            userObject.html(userObject.html().replace(/\n/g, '<br/>'));
            loginGoogle.detach();
            loginAmazon.detach();
            logoutLink.appendTo(linksBody);

            userGreeting.text(data.name);

        } else {
            console.log(false);
        }
    });
    var testBook = {
        book_id: "66786",
        title: "DataTypes.STRING",
        author: "DataTypes",
        isbn: "0000000",
        cover: "<img src='https://mdbootstrap.com/img/logo/mdb192x192.jpg' />"

    }
    $('[data-toggle="popover-hover"]').popover({
        html: true,
        trigger: 'hover',
        placement: 'bottom',
        content: function() {
            return JSON.stringify(testBook);
        }
    });
});