module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define("BestReads", {
       Title: DataTypes.STRING,
       Author:DataTypes.STRING,
       Rating:DataTypes.Number,
       Cover:DataTypes.STRING,

    });


    
    return BestReads;
  };

  
    
   