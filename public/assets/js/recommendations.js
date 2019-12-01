$(document).ready(function() {

    //blank bookRecs object
    var bookRecs = {
        author: []
    };

    getRecommendations();

    function getRecommendations() {

        //get the authors from the most recently added books - placeholder names for now
        var authorsArr = ["Chimamanda Ngozi Adichie", "Leigh Bardugo", "JK Rowling"];
        searchAuthors(authorsArr[0]);
        searchAuthors(authorsArr[1]);
        searchAuthors(authorsArr[2]);

        //variable to track loops
        var num = 0;

        //function containing api call to search authors and insert results into object
        function searchAuthors(author) {
            $.get("/xmltest2/" + author, function(data) {

                //blank array of works to push results into
                var workArr = [];

                //each search result gets pushed to the 'author' array in the books object
                for (var i = 0; i < 4; i++) {
                    var result = {
                        title: data.work[i].title,
                        author: data.work[i].author,
                        rating: data.work[i].rating,
                        image: data.work[i].image,
                        book_id: data.work[i].book_id
                    };

                    workArr.push(result);

                    num++
                };

                //push object with author name & blank work array to author array in bookRecs object
                authorObj = {
                    name: author,
                    work: workArr
                };
                bookRecs.author.push(authorObj);
            }).then(function(res) {
                if (num === 12) {
                    displayRecommendations();
                    num = 0;
                }
            });
        };
    };

    //GENERATES THE SEARCH RESULTS INTO CARDS
    function displayRecommendations() {

        console.log(bookRecs);

        //this selects the script tag 
        var recommendationsTemplate = $("#recommendations-template").html();
        //this compiles whatever object is passed through into the html
        var compiledRecommendations = Handlebars.compile(recommendationsTemplate);
        console.log(compiledRecommendations(bookRecs));
        // //this passes the books object through - the each statement in the html will loop through the works
        $("#recommendations-container").html(compiledRecommendations(bookRecs));

    };

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