module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define("BestReads", {
        provider: DataTypes.STRING,
        provider_id: DataTypes.STRING,
        name: DataTypes.INTEGER,
        picture: DataTypes.STRING,  
        email: DataTypes.STRING,  

    });

    return User;
    
};




