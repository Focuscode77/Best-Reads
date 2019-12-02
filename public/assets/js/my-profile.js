$(document).ready(function () {

    //this gets the user's data and uses it to populate the profile page
    $.get("/user").then(function (data) {
        var user = data;

        //DISPLAYES USER INFO ON THE PAGE
        //this selects the script tag 
        var userProfileTemplate = $("#user-profile-template").html();

        //this compiles whatever object is passed through into the html
        var compileduserProfile = Handlebars.compile(userProfileTemplate);


        //this passes the books object through - the each statement in the html will loop through the works
        $("#user-profile-container").html(compileduserProfile(user));
    });

});