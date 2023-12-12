const User = require('../models/users');
const fs = require('fs');
const path = require('path');
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Habit Tracker | Sign In"
    })
}

module.exports.signUp = function(req, res){
    return res.render("user_sign_up", {
        title: "Habit Tracker | Sign Up"
    })
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        console.log(req.body.password);
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body).then((user)=>{
                return res.redirect('/users/sign-in');
            }).catch((err)=>{
                console.log('error in creating the user while sign-in');
                return;
            })
        }
        else{
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log('error in user in signing in', err);
    })
};

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return err;
        }
        return res.redirect('/');
    })
}