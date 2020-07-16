const EXPRESS = require('express');
const HANDLEBARS = require('express-handlebars');
const BODY_PARSER = require('body-parser');
const POST = require('./models/Post');
const APP = EXPRESS();

/*TEMPLATE ENGINE CONFIG*/
APP.engine('handlebars', HANDLEBARS({ defaultLayout: 'main' }));
//defaultMain force o corpo html por padrão, Não é necessário digitar toda estrutura html.
APP.set('view-engine', 'handlebars');
/*=============================================================*/

/*=============================================================*/
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

//rotas
APP.get('/', (req, res) => {
  POST.findAll({ order: [['id', 'DESC']] }).then((posts) => {
    //receber todos valores do banco de dados com os posts
    res.render('home.handlebars', { posts: posts }); //renderizar pagina html com dados acessiveis pelo handlebars
  });
});
APP.get('/new_post', (req, res) => {
  res.render('form.handlebars');
});

APP.post('/submit_post', (req, res) => {
  POST.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then(() => {
      //caso sucesso, registre na database e mande a mensagem.
      res.redirect('/');
    })
    .catch((er) => {
      //caso falha, diga que há um erro e qual erro é.
      res.send('Houve um erro: ' + er);
    });
});

APP.get('/delete_post/:id', (req, res) => {
  POST.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect('/');
      console.log('mensagem com id' + req.params.id + ' deletada com sucesso.');
    })
    .catch((er) => {
      console.log('Erro!');
    });
});

APP.get('/read_post/:id', (req, res) => {
  POST.findAll({ where: { id: req.params.id } })
    .then((post) => {
      res.render('post.handlebars', {
        postId: post[0].dataValues.id,
        postTitle: post[0].dataValues.title,
        postContent: post[0].dataValues.content,
      });
    })
    .catch((er) => {
      console.log('erro na requisição');
    });
});
APP.listen(8081);
