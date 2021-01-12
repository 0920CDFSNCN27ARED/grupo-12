function assertIsAdmin(req, res, next) {
    if (res.locals.current_user) {
        if (!res.locals.current_user.admin) {
            res.redirect("/");
        } else {
            next();
        }
    } else {
        res.redirect("/users/login");
    }
}

module.exports = assertIsAdmin;