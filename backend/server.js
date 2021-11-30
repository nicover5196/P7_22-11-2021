// importation des plugins
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
// instanciation serveur
var server = express();

// bodyParser configuration
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

// configuration des routes
server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur mon super serveur</h1>');
});

server.use('/api/', apiRouter);

// lancement serveur
server.listen(8080, function(){
    console.log('Serveur en écoute');
});