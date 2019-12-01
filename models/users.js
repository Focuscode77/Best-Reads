module.exports = function (sequelize, DataTypes) {

    var users = sequelize.define("users", {
<<<<<<< HEAD
        name: DataTypes.INTEGER,
        pictureUrl: DataTypes.STRING,  
        email: DataTypes.STRING,
        dub: DataTypes.STRING,
        username: DataTypes.STRING
    });

    return users;
    
};




=======
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        dob: DataTypes.INTEGER,
        pictureURL: DataTypes.STRING
    });

    return users;

};
>>>>>>> master
