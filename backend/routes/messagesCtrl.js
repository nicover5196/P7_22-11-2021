//Importation

var models = require('../models');
var asyncLib = require('async'); 
var jwt = require('../utils/jwt.utils');

//constante

const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

//routes
module.exports = {
    createMessage:function(req,res){
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    if(title = null || content == null){
        return res.status(400).json({'Erreur': 'Mauvais paramètre'});
    }
    if(title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT){
        return res.status(400).json({'Erreur': 'Mauvais paramètre'});
    }
    asyncLib.waterfall([
        function(done){
            models.User.findOne({
                where: {id:userId}
            })
            .then(function(userFound){
                done(null,userFound);
            })
            .catch(function(err){
                return res.status(500).json({'Erreur': 'Utilisateur non vérifié'});
            });
        },
        function(userFound, done){
            if(userFound){
                models.Message.create({
                    title: title,
                    content:content,
                    likes:0,
                    UserId:userFound.id
                })
                .then(function(newMessage){
                    done(null,userFound,newMessage);
                });
            }else{
                res.status(404).json({'Erreur': 'Utilisateur non trouvé'});
            }
        },
    ], function(newMessage){
        if (newMessage){
            return res.status(201).json(newMessage);
        }else{
            return res.status(500).json({'Erreur':'Message non publiée'});
        }
    });
    },
    listMessages: function(req, res) {
        // Selectionnée les colonnes
        var fields  = req.query.fields;
        // Récupérer les messages par segmentation
        var limit   = parseInt(req.query.limit);
        var offset  = parseInt(req.query.offset);
        // Sortir les messages par ordre
        var order   = req.query.order;
    
        if (limit > ITEMS_LIMIT) {
          limit = ITEMS_LIMIT;
        }
    
        models.Message.findAll({
          order: [(order != null) ? order.split(':') : ['title', 'ASC']],
          attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
          limit: (!isNaN(limit)) ? limit : null,
          offset: (!isNaN(offset)) ? offset : null,
          include: [{
            model: models.User,
            attributes: [ 'username' ]
          }]
        }).then(function(messages) {
          if (messages) {
            res.status(200).json(messages);
          } else {
            res.status(404).json({ "error": "no messages found" });
          }
        }).catch(function(err) {
          console.log(err);
          res.status(500).json({ "error": "invalid fields" });
        });
      }
    }