var books = {
    work: []
};



//get data from the xml/json api route - general "search all"
$.get("/list/currentreads").then(function (data) {
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

});