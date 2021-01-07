function assertIsAdmin(req, res, next) {
    if(res.locals.user){
        if (!res.locals.user.admin) {
            res.redirect("/");
        } else{
            next();
        }
    }else{
        res.redirect("/users/login");
    }
}

module.exports = assertIsAdmin;