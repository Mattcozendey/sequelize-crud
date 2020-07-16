const SEQUELIZE = require('sequelize');
const DB_CONNECTION = new SEQUELIZE('auth', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
}); //table, usuario, senha do mysql, objeto json indicando onde está rodando servidor e qual banco de dados.

DB_CONNECTION.authenticate()
  .then(function () {
    //caso sucesso, execute then.
    console.log('Conectado com sucesso.');
  })
  .catch(function (erro) {
    //caso erro, execute catch.
    console.log('Falha ao se conectar. Erro: ' + erro);
  });

/*DEFINIR MODELO*/

const Users = DB_CONNECTION.define(
  'users',
  {
    name: {
      type: SEQUELIZE.STRING,
    },
    email: {
      type: SEQUELIZE.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
