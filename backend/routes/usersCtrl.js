// importation plugins
var bcrypt = require('bcrypt');
// const { json } = require('body-parser');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models/');
var asyncLib = require('async');

// Constante 

const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
    register: function(req, res){
    // Paramètre
    var username = req.body.username;
    var password =  req.body.password;
    var bio = req.body.bio;

    if (username == null || password == null){
        return res.status(400).json({ 'Erreur': 'Mauvais paramètres'});
    }
    if(username.length >=13 || username.length <=4){
        return res.status(400).json({'Erreur': 'Mauvais identifiant (Doit contenir entre 5 & 12 caractères)'});
    } 
    if(!PASSWORD_REGEX.text(password)){
        return res.status(400).json({'Erreur': 'Mauvais mot de passe (Doit contenir entre 4 & 8 caractères et 1 chiffre)'});
    }
    asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            attributes: ['username'],
            where: { username: username }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'Erreur': 'Utilisateur non vérifié' });
          });
        },
        function(userFound, done) {
          if (!userFound) {
            bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
              done(null, userFound, bcryptedPassword);
            });
          } else {
            return res.status(409).json({ 'Erreur': 'Utilisateur déjà existant' });
          }
        },
        function(userFound, bcryptedPassword, done) {
          var newUser = models.User.create({
            username: username,
            password: bcryptedPassword,
            bio: bio,
            isAdmin: 0
          })
          .then(function(newUser) {
            done(newUser);
          })
          .catch(function(err) {
            return res.status(500).json({ 'Erreur': 'Utilisateur non ajouté' });
          });
        }
      ], function(newUser) {
        if (newUser) {
          return res.status(201).json({
            'userId': newUser.id
          });
        } else {
          return res.status(500).json({ 'Erreur': 'Utilisateur non ajouté' });
        }
      });
    },
    login: function(req, res) {
  // Params
  var username    = req.body.username;
  var password = req.body.password;

  if (username == null ||  password == null) {
    return res.status(400).json({ 'Erreur': 'Mauvais paramètre' });
  }

  asyncLib.waterfall([
    function(done) {
      models.User.findOne({
        where: { username: username }
      })
      .then(function(userFound) {
        done(null, userFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'Erreur': 'Utilisateur non vérifié' });
      });
    },
    function(userFound, done) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
          done(null, userFound, resBycrypt);
        });
      } else {
        return res.status(404).json({ 'Erreur': 'Utilisateur absent dans la base' });
      }
    },
    function(userFound, resBycrypt, done) {
      if(resBycrypt) {
        done(userFound);
      } else {
        return res.status(403).json({ 'Erreur': 'Mot de passe invalide' });
      }
    }
  ], function(userFound) {
    if (userFound) {
      return res.status(201).json({
        'userId': userFound.id,
        'token': jwtUtils.generateTokenForUser(userFound)
      });
    } else {
      return res.status(500).json({ 'Erreur': 'Connexion identifiant impossible' });
    }
  });
},
getUserProfile: function(req, res) {
  // Getting auth header
  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);

  if (userId < 0)
    return res.status(400).json({ 'Erreur': 'wrong token' });

  models.User.findOne({
    attributes: [ 'id', 'username', 'bio' ],
    where: { id: userId }
  }).then(function(user) {
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ 'Erreur': 'Utilisateur non trouvé' });
    }
  }).catch(function(err) {
    res.status(500).json({ 'Erreur': 'Utilisateur non récupéré' });
  });
},
updateUserProfile: function(req, res) {
  // Getting auth header
  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);

  // Paramètres
  var bio = req.body.bio;

  asyncLib.waterfall([
    function(done) {
      models.User.findOne({
        attributes: ['id', 'bio'],
        where: { id: userId }
      }).then(function (userFound) {
        done(null, userFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'Erreur': 'Utilisateur non vérifié' });
      });
    },
    function(userFound, done) {
      if(userFound) {
        userFound.update({
          bio: (bio ? bio : userFound.bio)
        }).then(function() {
          done(userFound);
        }).catch(function(err) {
          res.status(500).json({ 'Erreur': 'Modification utilisateur impossible' });
        });
      } else {
        res.status(404).json({ 'Erreur': 'Utilisateur non trouvé' });
      }
    },
  ], function(userFound) {
    if (userFound) {
      return res.status(201).json(userFound);
    } else {
      return res.status(500).json({ 'Erreur': 'Impossible de modifié le profil' });
    }
  });
}
}