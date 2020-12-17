require('dotenv').config();

module.exports = {
  "development": {
    "username": "dbuser",
    "password": process.env.db_password,
    "database": process.env.db_name,
    "host": process.env.host,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.RDS_USER_NAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DB_NAME,
    "host": process.env.host,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.RDS_USER_NAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DB_NAME,
    "host": process.env.host,
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
