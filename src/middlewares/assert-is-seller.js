function assertIsSeller(req, res, next) {
    if (res.locals.current_user) {
        if (res.locals.current_user.role != "seller") {
            res.redirect("/");
        } else {
            next();
        }
    } else {
        res.redirect("/users/login");
    }
}

module.exports = assertIsSeller;