$(document).ready(function (req, res) {
    var displayBody = $(".display")
    var linksBody = $(".linkz")
    var loginLink = $("#login")
    var logoutLink = $("#logout")
    logoutLink.detach();
    // loginLink.on("click", () => {
    $.get("/user").then(function (data) {
        if (data) {
            displayBody.text("Welcome: " + data);
            loginLink.detach();
            logoutLink.appendTo(linksBody);
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