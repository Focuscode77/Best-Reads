module.exports = function (sequelize, DataTypes) {

    var amazon_uid = sequelize.define("amazon_uid", {
        amazon_uid: DataTypes.STRING
    });

    return amazon_uid;

};