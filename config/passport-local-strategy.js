const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
// const { use } = require('passport');


//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req,email,password,done){
        //Find a user and establish the identity
        User.findOne({email: email}, function(err,user) {
            if(err)
            {
                // console.log('Error in Finding user --> Passport');
                req.flash('error',err);
                return done(err);
            }

            //if user not found or password not matches with the password user Enter
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }

            return done(null,user);
        });
    }

));



// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in Finding user --> Passsport');
            return done(err);
        }
        return done(null,user); 
    });
});


//check if the user is authenticated

passport.checkAuthentication = function(req,res,next){  // function works as middleware
    
    //if the user is signed in, then pass on the request to the next function (Controller's action)
    if(req.isAuthenticated()){
        return next();
    }    

    //if the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAunthenticatdUser = function(req,res,next)
{
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from session cookie and we are just sending this to the locals for the views
      res.locals.user= req.user;
    }

    next();
}
module.exports = passport;
