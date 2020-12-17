const dbConfig = require("../config/dbconfig");
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,dbConfig.USER, dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.watch = require("./Watch")(sequelize, Sequelize);
db.alert = require("./Alert")(sequelize, Sequelize);
module.exports = db;
