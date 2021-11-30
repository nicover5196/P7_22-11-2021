// importation plugins
var bcrypt = require('bcrypt');
const { json } = require('body-parser');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models/');

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

    models.User.findOne({
        attributes: ['username'],
        where: { username:username}
    })
    .then(function(userFound){
        if(!userFound){
        bcrypt.hash(password,5,function(err,bcryptedPassword){
            var newUser = models.User.create({
                username:username,
                password:bcryptedPassword,
                bio:bio,
                isAdmind:0
            })
            .then(function(newUser){
                return res.status(201).json({
                    'userId': newUser.id
                })
            })
            .catch(function(err){
                return res.status(500).json({'erreur':'Utilisateur non ajouté'});
            });
        });
        }else{
            return res.status(409).json({'erreur':'Utilisateur non existant'});
        }
    })
    .catch(function(err){
        return res.status(500).json({'erreur': 'Utilisateur non vérifié'})
    });
    },
    login: function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        if(username == null || password ==null){
            return res.status(400).json({ 'erreur': 'Mauvais Paramètre'});
        }
        models.User.findOne({
            where:{ username: username}
        })
        .then(function(userFound){
            if(userFound){
                bcrypt.compare(password,userFound.password,function(errBycrypt,resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    }else{
                        return res.status(403).json({'Erreur': 'Mauvais mot de passe'});
                    }
                })
            }else{
                return res.status(404).json({'Erreur': 'Utilisateur non existant dans la base'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Erreur': 'Utilisateur non vérifié'});
        });
    }
}