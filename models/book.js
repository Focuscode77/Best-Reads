module.exports = function (sequelize, DataTypes) {

    var Book = sequelize.define("BestReads", {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        cover: DataTypes.STRING,
        list: DataTypes.STRING,
    });


    return Book;

};