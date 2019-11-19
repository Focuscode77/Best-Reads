$(document).ready(function (req, res) {
    var displayBody = $("#display")
    var linksBody = $("#linkz")
    var loginGoogle = $("#login-google")
    var loginAmazon = $("#login-amazon")

    var logoutLink = $("#logout")
    logoutLink.detach();
    // console.log("Yo i ran made them vars!");
    // loginLink.on("click", () => {
    $.get("/user").then(function (data) {
        if (data) {
            console.log(data);
            var userObject = displayBody.text("Welcome: " + data.name + "\nLogged in thru: " + data.provider);

            userObject.html(userObject.html().replace(/\n/g, '<br/>'));
            loginGoogle.detach();
            loginAmazon.detach();
            logoutLink.appendTo(linksBody);
        } else {
            console.log(false);
        }
    });

    //     loginLink.detach();
    //     logoutLink.appendTo(linksBody);


    // })
    // logoutLink.on("click", () => {
    //     displayBody.text("Logged out!");
    //     logoutLink.detach();
    //     loginLink.appendTo(linksBody)
    // })
});