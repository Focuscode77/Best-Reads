<<<<<<< HEAD:config/config.json
{
    "development": {
        "username": "root",
        "password": "yourRootPassword",
        "database": "database_development",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    },
    "test": {
        "username": "root",
        "password": "yourRootPassword",
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    },
    "production": {
        "username": "root",
        "password": "yourRootPassword",
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    }
}
=======
require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": "",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
};
>>>>>>> master:config/config.js
