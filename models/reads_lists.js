module.exports = function (sequelize, DataTypes) {
    var reads_lists = sequelize.define("reads_lists", {
        user_id: DataTypes.INTEGER,
        book_id: DataTypes.INTEGER,
        cat_id: DataTypes.INTEGER
    });
    return reads_lists;
};