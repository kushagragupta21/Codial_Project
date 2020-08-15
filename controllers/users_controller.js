const User = require('../models/user'); //require of user file for find() function

module.exports.profile = function(req,res){

    // res.end('<h1>User Profile</h1>');

    return res.render('user_profile',{
        title: "profile"
    });


}

//render the sign Up page
module.exports.signUp = function(req,res){


        
        if(req.isAuthenticated()){  // excute when user is alredy sign in and want to again sign up
           return res.redirect('/users/profile');
        }




    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}




//render the sign in page
module.exports.signIn = function(req,res){



    if(req.isAuthenticated()){      // excute when user is alredy sign in and want to again sign sign in 
       return res.redirect('/users/profile');
    }

return res.render('user_sign_in', {
    title: "Codial | Sign In"
});
}


//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //checking if user exist beforn or not by findOne function On the basis of checking email
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return}
        
        if(!user){  //if user not exist then we create it
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing'); return}
                
                return res.redirect('/users/sign-in');
            })
       
        } else{//meaning if user is already present sents back to sign up page
            return res.redirect('back');
        }

        
    
    });
    

}


//sign in and create a session for the user
module.exports.createSession = function(req,res){
    
    return res.redirect('/');


}


module.exports.destroySession = function(req,res){
    req.logout();  //This will give request to passport

    return res.redirect('/');
}