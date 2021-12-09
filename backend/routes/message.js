// Importation de notre framework dans notre application
const express = require('express');

// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();

// Importation du controller
const messageController = require('../controllers/message');

// On importe le middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fs = require('fs');

// Différentes routes de l'api
console.log('routerMessage');
// Route qui permet de récupérer tout les messages
router.get('/', auth, messageController.getAllMessages);
// Route qui permet de récupérer un message par ID
router.get('/:id', auth, messageController.getOneMessage);
// Route qui permet de créer un message
router.post('/', auth, multer, messageController.createMessage);
// Route qui permet de modifié un message par ID
router.put('/:id', auth, multer, messageController.modifyMessage);
// Route qui permet de supprimé un message par ID
router.delete('/:id', auth, messageController.deleteMessage );


module.exports = router;