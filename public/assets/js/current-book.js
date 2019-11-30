$(document).ready(function() {

    //stores the information from the query URL in the object currentBook
    var currentBook = {
        title: decodeURI(GetParameterValues('book')),
        author: decodeURI(GetParameterValues('author')),
        rating: GetParameterValues('rating'),
        image: GetParameterValues('image'),
        id: GetParameterValues('id')
    };

    //BOOK INFORMATION IS DISPLAYED ON THE PAGE
    //this selects the script tag 
    var currentBookTemplate = $("#current-book-template").html();
    //this compiles whatever object is passed through into the html
    var compiledCurrentBookTemplate = Handlebars.compile(currentBookTemplate);
    //the compiled template is displayed in the div
    $("#current-book").html(compiledCurrentBookTemplate(currentBook));


    //this function grabs the query parameter from the url
    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            };
        };
    };





    /// Display the Lists the Book is On
    function getListsAddedTo(book, listValue) {
        $.post("/api/add/" + book + "/" + listValue, function(data) {
            console.log(book + " has been added to " + listValue)
        });
    };



});