module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define("BestReads", {
      book: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });


    
    return BestReads;
  };