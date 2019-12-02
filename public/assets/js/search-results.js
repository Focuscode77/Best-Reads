$(document).ready(function () {

    function getSearchResults() {

        //get the query from session storage when the results page loads
        var query = sessionStorage.getItem('query');

        //a books object with empty works array to push search result into
        var books = {
            work: []
        };

        //get data from the xml/json api route - general "search all"
        $.get("/search/" + query, function (data) {
            console.log(data)
            //each search result gets pushed to the 'works' array in the books object
            for (var i = 0; i < 20; i++) {
                var result = {
                    title: data.work[i].title,
                    author: data.work[i].author,
                    rating: data.work[i].rating,
                    image: data.work[i].image,
                    book_id: data.work[i].book_id
                };

                //push each result to the 'work' array in the book object
                books.work.push(result);
            };
        }).then(function () {
            //GENERATES THE SEARCH RESULTS INTO CARDS
            //this selects the script tag 
            var searchResultsTemplate = $("#search-results-template").html();
            //this compiles whatever object is passed through into the html
            var compiledSearchResults = Handlebars.compile(searchResultsTemplate);
            //this passes the books object through - the each statement in the html will loop through the works
            $("#search-results").html(compiledSearchResults(books));

        });
    }
    getSearchResults();

});








// //rating
// console.log(data.GoodreadsResponse.search.results.work[i].average_rating._text);
// //title
// console.log(data.GoodreadsResponse.search.results.work[i].best_book.title._text);
// //author
// console.log(data.GoodreadsResponse.search.results.work[i].best_book.author.name._text);
// //image url
// console.log(data.GoodreadsResponse.search.results.work[i].best_book.image_url._text);
// //small image url
// console.log(data.GoodreadsResponse.search.results.work[i].best_book.small_image_url._text);