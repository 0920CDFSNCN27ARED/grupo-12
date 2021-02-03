function assertSignedIn (req, res, next) {
    if (!res.locals.current_user) {
        res.redirect("/users/login");
    } else {
        next();
    }
}

module.exports = assertSignedIn;