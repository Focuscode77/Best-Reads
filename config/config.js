require('dotenv').config();
<<<<<<< HEAD
=======

>>>>>>> master



module.exports = {
<<<<<<< HEAD
    development: {
        username: "root",
        password: "yourRootPassword",
        database: "database_development",
        host: "127.0.0.1",
        dialect: "mysql",
        operatorsAliases: false
    },
    test: {
        username: "root",
        password: "",
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        operatorsAliases: false
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: false
    }
};
=======
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }


};

>>>>>>> master
