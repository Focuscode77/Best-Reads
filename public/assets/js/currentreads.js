var books= {
    work: []
};



//get data from the xml/json api route - general "search all"
$.get("/api/mylist/current").then(function (data) {
    console.log(data);
    //each search result gets pushed to the 'works' array in the books object
    for (var i = 0; i < data.length; i++) {
        var result = data[i]

        //push each result to the 'work' array in the book object
        books.work.push(result);
    };
    console.log(books.work);
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