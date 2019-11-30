module.exports = function (sequelize, DataTypes) {

    var Book = sequelize.define("book", {
        book_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        isbn: DataTypes.INTEGER,
        cover: DataTypes.STRING
    });

    return Book;

};