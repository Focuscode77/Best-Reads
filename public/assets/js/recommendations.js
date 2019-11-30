$(document).ready(function() {

    console.log("hi");

    function getRecommendations() {

        //get the author from the most recently added books - for now it's replaced with A A Milne
        var author = "A A Milne";

        //update author name in title
        $("#author-name").text(author);

        //a books object with empty works array to push search result into
        var books = {
            work: []
        };

        //get data from the xml/json api route - general "search all"
        $.get("/xmltest2/" + author, function(data) {
                //each search result gets pushed to the 'works' array in the books object
                for (var i = 0; i < 4; i++) {
                    var result = {
                        title: data.GoodreadsResponse.search.results.work[i].best_book.title._text,
                        author: data.GoodreadsResponse.search.results.work[i].best_book.author.name._text,
                        rating: data.GoodreadsResponse.search.results.work[i].average_rating._text,
                        image: data.GoodreadsResponse.search.results.work[i].best_book.image_url._text,
                        id: data.GoodreadsResponse.search.results.work[i].best_book.id._text
                    };

                    //push each result to the 'work' array in the book object
                    books.work.push(result);
                };
            })
            .then(function() {
                //GENERATES THE SEARCH RESULTS INTO CARDS
                //this selects the script tag 
                var recommendationsTemplate = $("#recommendations-template").html();
                console.log(recommendationsTemplate);
                //this compiles whatever object is passed through into the html
                var compiledRecommendations = Handlebars.compile(recommendationsTemplate);
                console.log(compiledRecommendations(books));
                // //this passes the books object through - the each statement in the html will loop through the works
                $("#recommendations-container").html(compiledRecommendations(books));
            });
    }

    getRecommendations();

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