module.exports = function (sequelize, DataTypes) {
    var reads_lists = sequelize.define("reads_list_items", {
        user_id: DataTypes.INTEGER
    });
    return reads_lists;
};