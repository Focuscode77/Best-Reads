module.exports = function (sequelize, DataTypes) {

    var BestReads = sequelize.define("BestReads", {
        Title: DataTypes.STRING,
        Author: DataTypes.STRING,
        Rating: DataTypes.INTEGER,
        Cover: DataTypes.STRING,

    });


    return BestReads;
};


module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        Title: DataTypes.STRING,
        Author: DataTypes.STRING,
        Author: DataTypes.STRING,
        Rating: DataTypes.INTEGER,
        Cover: DataTypes.STRING,


    });


    return User;

};