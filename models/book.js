module.exports = function (sequelize, DataTypes) {
   var BestReads = sequelize.define("BestReads", {
      Title: DataTypes.STRING,
      Author: DataTypes.STRING,
      Rating: DataTypes.INTEGER,
      Cover: DataTypes.STRING,

   });



   return BestReads;
};