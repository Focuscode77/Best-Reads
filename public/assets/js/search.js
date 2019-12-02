$(document).ready(function () {


    //search goodreads api through search form and render results
    $("#search-btn").on("click", function () {
        event.preventDefault();

        //clear previous session storage
        sessionStorage.clear();

        //creates an empty object with an empty array for the search results to be stored in
        var books = {
            work: []
        };

        //grab the user input from the text field
        var query = $("#user-query").val();

        //grab the search type from the dropdown
        var queryType = $("#query-type").val();

        //save the query to session storage
        sessionStorage.setItem("query", query);

        location.replace("/results");

    });
});