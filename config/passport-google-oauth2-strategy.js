const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login 
passport.use(new googleStrategy({

        clientID: "589650319351-hg5rg14vmq449i54mk25ac9gtpoemmie.apps.googleusercontent.com",
        clientSecret: "qqdp82_5v3b2xaK5a4761NEz",
        callbackURL: "http://localhost:8000/users/auth/google/callback",

        },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err); return;}
            
            
            console.log(profile);


            if(user){
                // If found, set this user as req.user
                return done(null,user);
            }else{
                //If not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){console.log('error in creating user google strategy-passport',err); return;}

                    return done(null,user);
                
                });
                
            
        }

        
     });

    }

));

module.exports = passport;