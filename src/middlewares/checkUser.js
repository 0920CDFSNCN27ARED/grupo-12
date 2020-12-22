const getUsers = require('../utils/getUsers')

function checkUser(req,res,next){
    let users = getUsers();
    if(users.length == 0){
        next();
    }
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if(req.body.email == user.email && req.body.userName == user.userName){
            res.render("users/register", {errors:[
                {msg:"El email y usuario ingresado ya se encuentran en uso"}
            ]});
        }
        else if(req.body.email == user.email){
            res.render("users/register", {errors:[
                {msg:"El email ingresado ya está en uso"}
            ]});
        }else if(req.body.userName == user.userName){
            res.render("users/register", {errors:[
                {msg:"El nombre de usuario ingresado ya está en uso"}
            ]});
        }
    }
}

module.exports = checkUser;