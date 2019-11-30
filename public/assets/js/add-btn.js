$(document).ready(function() {

    $(document).on("click", ".add-to-list", function() {

        var list = $(this).attr('id');
        var listValue = $(this).attr('value');
        var book = $(this).attr('data-id');

        console.log("looks like you wanna add book #" + book + " to " + list + " #" + listValue);

        updateList(book, listValue);

        // var title = $(this).attr('data-title');
        // var author = $(this).attr('data-author');
        // var image = $(this).attr('data-img');
        // var rating = $(this).attr('data-rating');

        //1 - Current Reads
        //2 - Past Reads
        //3 - Future Reads

    });

    function updateList(book, listValue) {
        $.post("/api/add/" + book + "/" + listValue, function(data) {
            console.log(book + " has been added to " + listValue)
        });
    };

});