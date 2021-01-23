function assertSignedIn(req, res, next) {
    if (!res.locals.current_user || req.session.current_user == null || req.session.current_user == undefined) {
        res.redirect("/users/login");
    } else {
        next();
    }
}

module.exports = assertSignedIn;