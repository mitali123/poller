require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.user,
    "password": process.env.password,
    "database": process.env.db,
    "host": process.env.host,
    "kafka_server": process.env.kafka_server,
    "dialect": "mysql",
    "ssl": true
  },
  "test": {
    "username": process.env.RDS_USER_NAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DB_NAME,
    "host": process.env.host,
    "dialect": "",
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
