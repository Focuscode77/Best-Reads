$(document).ready(function () {

    $(document).on("click", ".add-to-list", function () {

        var listValue = $(this).attr('value');
        var book = $(this).attr('data-id');
        updateList(book, listValue);
    });

    function updateList(book, listValue) {
        $.post("/api/add/" + book + "/" + listValue, function (data) {});
    };

});