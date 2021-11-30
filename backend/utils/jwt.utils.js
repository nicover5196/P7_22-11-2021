// Importation Plugins
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0sjsaazdazd455azd1az1d1az4daz2d1azd1zada2d1a55661azd1131addad'

//Exportation des fonctions

module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmind: userData.isAdmind
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}