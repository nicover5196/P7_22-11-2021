// Importation du model 
const Message = require('../models/message');
const db = require('../models');
// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs');
const message = require('../models/message');


// Récuperer touts les messages
exports.getAllMessages = (req, res, next) => {
    // On utilise la méthode find pour obtenir la liste complète des messages trouvées dans la base, l'array de tout les messages de la base de données
    db.message.findAll()
      // Si OK on retourne un tableau de toutes les données
      .then(
          messages => res.status(200).json(messages))
      // Si erreur on retourne un message d'erreur
      .catch(error => res.status(400).json({
        error
      }));
  };
  
// Récuperer un message par son ID
exports.getOneMessage = (req, res, next) => {
  // On utilise la méthode findOne et on lui passe l'objet de comparaison, on veut que l'id de la message soit le même que le paramètre de requête
  Message.findOne({
      _id: req.params.id
    })
    // Si ok on retourne une réponse et l'objet
    .then(message => res.status(200).json(message))
    // Si erreur on génère une erreur 404 
    .catch(error => res.status(404).json({
      error
    }));
};

// Créer un message 
exports.createMessage = (req, res, next) => {
  // On stocke les données envoyées par le front-end sous forme de form-data dans une variable en les transformant en objet js
  const messageObject = JSON.parse(req.body.message);
  // On supprime l'id généré automatiquement et envoyé par le front-end. L'id de la message est créé par la base lors de la création dans la base
  delete messageObject._id;
  // Création d'une instance du modèle message
  const message = new Message({
    ...messageObject,
    // On modifie l'URL de l'image, on veut l'URL complète, quelque chose dynamique avec les segments de l'URL
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  // Sauvegarde de la message dans la base de données
  message.save()
    // On envoi une réponse au frontend avec un statut 201 sinon on a une expiration de la requête
    .then(() => res.status(201).json({
      message: 'Message enregistrée !'
    }))
    // On ajoute un code erreur en cas de problème
    .catch(error => res.status(400).json({
      error
    }));
};

// Modifier un message
exports.modifyMessage = (req, res, next) => {
  let messageObject = {};
  req.file ? (
    // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
    Message.findOne({
      _id: req.params.id
    }).then((message) => {
      // On supprime l'ancienne image du serveur
      const filename = message.imageUrl.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    }),
    messageObject = {
      // On modifie les données et on ajoute la nouvelle image
      ...JSON.parse(req.body.message),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  ) : ( // Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
    // Si la modification ne contient pas de nouvelle image
    messageObject = {
      ...req.body
    }
  )
  Message.updateOne(
      // On applique les paramètre de messageObject
      {
        _id: req.params.id
      }, {
        ...messageObject,
        _id: req.params.id
      }
    )
    .then(() => res.status(200).json({
      message: 'Message modifiée !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}

// Supprimer un message
exports.deleteMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then(message => {
      const filename = message.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Message.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

