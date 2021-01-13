// Data
const getData = require("../utils/getData");
let users = getData("../data/usersDB.json");

function authenticate(req, res, next) {
    const id = req.session.loggedUserId;

    if (!id) return next();

    const loggedUser = users.find((user) => {
        return user.id == id;
    });

    if (!loggedUser) {
        delete req.session.loggedUserId;
        return next();
    };

    res.locals.current_user = loggedUser;
    req.session.current_user = loggedUser;

    next();
}

module.exports = authenticate;