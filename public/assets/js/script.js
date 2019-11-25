//anytime a button with the class current-book-link is clicked on the site, 
//the user will be taken to the book profile with a custom url

$(document).on("click", ".current-book-link", function() {
    var id = $(this).attr('id')
    var title = $(this).attr('data-title');
    var author = $(this).attr('data-author');
    var image = $(this).attr('data-img');
    var rating = $(this).attr('data-rating');
    location.replace("/currentbook?book=" + encodeURI(title) + "&author=" + encodeURI(author) + "&image=" + image + "&rating=" + rating + "&id=" + id);
});