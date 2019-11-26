module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define("BestReads", {
        name: DataTypes.INTEGER,
        picture: DataTypes.STRING,  
        email: DataTypes.STRING,
    });

    return User;
    
};




