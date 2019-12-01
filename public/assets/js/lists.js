$(document).ready(function() {

    //anytime a button with the class list is clicked on the site, 
    //the user will be taken to the list page with a custom url
    $(document).on("click", ".list", function() {
        var id = $(this).attr('list')
        location.replace("/currentreads");
    });

});