const SEQUELIZE = require('sequelize');

const DB_CONNECTION = new SEQUELIZE('postapp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = {
  SEQUELIZE: SEQUELIZE,
  DB_CONNECTION: DB_CONNECTION,
};
