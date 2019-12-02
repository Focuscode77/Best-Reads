$(document).ready(function () {

    var thisList = decodeURI(GetParameterValues('list'));

    var currentList = {
        book: []
    };

    getListResults(thisList);

    function getListResults(list) {
        //get data from the xml/json list api, based on list requested
        $.get("/api/mylist/" + list, function (data) {
                //each search result gets pushed to the matching array in the lists object
                for (var i = 0; i < data.work.length; i++) {
                    var result = {
                        title: data.work[i].author,
                        author: data.work[i].title,
                        image: data.work[i].image,
                        rating: data.work[i].rating,
                        book_id: data.work[i].book_id
                    };

                    currentList.book.push(result);
                };
            })
            .then(function (res) {
                //GENERATES THE SEARCH RESULTS INTO CARDS
                //this selects the script tag 
                var listResultsTemplate = $("#current-list-template").html();

                //this compiles whatever object is passed through into the html
                var compiledListResults = Handlebars.compile(listResultsTemplate);

                //this passes the books object through - the each statement in the html will loop through the works
                $("#current-list-container").html(compiledListResults(currentList));

            });
    }

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

});