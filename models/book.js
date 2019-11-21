module.exports = function (sequelize, DataTypes) {

    var Book = sequelize.define("BestReads", {
        Title: DataTypes.STRING,
        Author: DataTypes.STRING,
        Rating: DataTypes.INTEGER,
        Cover: DataTypes.STRING,
        List: DataTypes.STRING,

    });

    return Book;
    
};





