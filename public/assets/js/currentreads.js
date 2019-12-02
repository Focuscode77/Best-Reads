var books = {
    work: []
};



//get data from the xml/json api route - general "search all"
$.get("/api/mylist/current").then(function (data) {
    //each search result gets pushed to the 'works' array in the books object
    for (var i = 0; i < data.length; i++) {
        var result = data[i]

        //push each result to the 'work' array in the book object
        books.work.push(result);
    };
});