module.exports = function(sequelize, DataTypes) {

    var users = sequelize.define("users", {
        name: DataTypes.INTEGER,
        pictureUrl: DataTypes.STRING,
        email: DataTypes.STRING,
        dub: DataTypes.STRING,
        username: DataTypes.STRING
    });

    return users;

};