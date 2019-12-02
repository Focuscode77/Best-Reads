module.exports = function (sequelize, DataTypes) {

    var books = sequelize.define("books", {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        rating: DataTypes.STRING,
        image: DataTypes.STRING,
        book_id: DataTypes.INTEGER,
    });


    return books;

};