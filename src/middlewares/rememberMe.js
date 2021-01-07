const getUsers = require('../utils/getUsers');

function rememberMe (req,res,next){
    let users = getUsers();
    if(req.cookies.remember && !req.session.loggedUserId){
        let usuarioALoguearse;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.email==req.cookies.remember) {
                usuarioALoguearse = user;
                break;
            }
        }
        req.session.loggedUserId = usuarioALoguearse.id;
    }
    next();
};

module.exports = rememberMe;