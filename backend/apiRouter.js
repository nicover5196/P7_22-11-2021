// importation plugins
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');

// Router
exports.router = (function(){
    var apiRouter = express.Router();

    // Users route 
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    return apiRouter;
})();