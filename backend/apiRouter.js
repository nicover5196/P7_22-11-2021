// importation plugins
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var messagesCtrl = require('./routes/messagesCtrl');
var likesCrtl = require('./routes/likesCtrl');

// Router
exports.router = (function(){
    var apiRouter = express.Router();

    // Users route 
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);

    // Messages Route
    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessages);

    // Likes routes
    apiRouter.route('messages/:messageId/vote/like').post(likesCrtl.likePost);
    apiRouter.route('messages/:messageId/vote/dislike').post(likesCrtl.dislikePost);
    
    return apiRouter;
})();