$(document).ready(function() {

    console.log("you are viewing your lists");

    // get current reads list that matches user id
    function getCurrentReads(user) {
        userId = profile.uid || "";
        if (userId) {
            userId = "/?author_id=" + userId;
        }
        $.get("/api/posts" + authorId, function(data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(author);
            } else {
                initializeRows();
            }
        });
    }
    // loop through the first 4 books to get the information on each
    // render the results on the page 





});