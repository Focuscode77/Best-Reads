module.exports = function (sequelize, DataTypes) {

    var users = sequelize.define("users", {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        dob: DataTypes.INTEGER,
        pictureURL: DataTypes.STRING,
        newUser: DataTypes.BOOLEAN
    });

    return users;

};