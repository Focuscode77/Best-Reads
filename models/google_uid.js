module.exports = function (sequelize, DataTypes) {

    var google_uid = sequelize.define("google_uid", {
        google_uid: DataTypes.STRING
    });

    return google_uid;

};