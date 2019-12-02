$(document).ready(function() {

    var lists = {
        current: [],
        past: [],
        future: [],
    };

    getListResults("current");
    // getListResults("past");
    // getListResults("future");

    function getListResults(list) {
        //get data from the xml/json list api, based on list requested
        $.get("/api/mylist/" + list, function(data) {
                //each search result gets pushed to the matching array in the lists object
                for (var i = 0; i < 3; i++) {
                    var result = {
                        title: data.work[i].author,
                        author: data.work[i].title,
                        image: data.work[i].image,
                        rating: data.work[i].rating,
                        book_id: data.work[i].book_id
                    };

                    //push each result to the proper array in the lists object based on which was selected
                    switch (list) {
                        case "current":
                            lists.current.push(result)
                            break;
                        case "past":
                            lists.past.push(result);
                            break;
                        case "future":
                            lists.future.push(result);
                            break;
                    }
                };
            })
            .then(function(res) {

                console.log(lists);
                //GENERATES THE SEARCH RESULTS INTO CARDS
                //this selects the script tag 
                var listResultsTemplate = $("#" + list + "-reads-template").html();

                //this compiles whatever object is passed through into the html
                var compiledListResults = Handlebars.compile(listResultsTemplate);

                //this passes the books object through - the each statement in the html will loop through the works
                $("#" + list + "-reads-container").html(compiledListResults(lists));

            });
    }

});













// function getCurrentReads(user) {
//     userId = profile.uid || "";
//     if (userId) {
//         userId = "/?author_id=" + userId;
//     }
//     $.get("/api/" + authorId, function(data) {
//         console.log("Posts", data);
//         posts = data;
//         if (!posts || !posts.length) {
//             displayEmpty(author);
//         } else {
//             initializeRows();
//         }
//     });
// }