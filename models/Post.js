const db = require('./db');

const POST = db.DB_CONNECTION.define('posts', {
  title: {
    type: db.SEQUELIZE.STRING,
  },
  content: {
    type: db.SEQUELIZE.TEXT,
  },
});

//POST.sync({ force: true }); só executar uma vez para inserir o model.

module.exports = POST;
