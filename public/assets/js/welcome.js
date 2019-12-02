$(document).ready(function (req, res) {
    var displayBody = $(".navbar__link")
    var userGreeting = $("#username");
    var logoutLink = $("#logout")
    logoutLink.detach();
    $.get("/user").then(function (data) {
        if (data) {
            logoutLink.appendTo(displayBody);
            userGreeting.text(data.name);
        } else {}
    });
});