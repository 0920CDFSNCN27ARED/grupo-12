
// Data
const getData = require("../utils/getData");
let users = getData("../data/usersDB.json");

function rememberMe (req,res,next){
    if(req.cookies.remember && !req.session.loggedUserId){
        let loggedUser;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.email==req.cookies.remember) {
                loggedUser = user;
                break;
            }
        }
        req.session.loggedUserId = loggedUser.id;
        req.session.current_user.id = loggedUser.id;
    }
    next();
};

module.exports = rememberMe;