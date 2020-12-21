const usersController = {
    login: function(req, res, next) {
        res.render('users/login');
    },
    register: function(req, res, next) {
        res.render('users/register');
    },
    confirmation:function(req, res, next) {
        res.render('users/confirmation');
    },
    profile: function(req, res, next) {
        res.render('users/profile');
    },
}

module.exports = usersController;