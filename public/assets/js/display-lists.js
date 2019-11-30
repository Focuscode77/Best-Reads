$(document).ready(function() {

    console.log("you are viewing your lists");

    // get current reads list that matches user id
    var authorId;
    if (url.indexOf("?author_id=") !== -1) {
        authorId = url.split("=")[1];
        getPosts(authorId);
    }
    // If there's no authorId we just get all posts as usual
    else {
        getPosts();
    }
    // loop through the first 4 books to get the information on each
    // render the results on the page 



});