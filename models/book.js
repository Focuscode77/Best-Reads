module.exports = function (sequelize, DataTypes) {

    var books = sequelize.define("BestReads", {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        image: DataTypes.STRING,
        book_Id: DataTypes.STRING
    });


    return books;
    
};


