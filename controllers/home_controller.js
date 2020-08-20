const Post = require('../models/post');

module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for Codial</h1>')
   
    // console.log(req.cookies); //req the cokkie from browser
    // res.cookie('user_id' , 25); //to change the value of cookie
    
    // Post.find({},function(err,posts){
    //     return res.render('home' ,{
    //         title: "Codial | Home",
    //         posts: posts

    //     }); 
    // });

    //populate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
        // console.log(posts[0]);
        return res.render('home',{

            title: "Codial | Home",
            posts: posts,
            
            
        }); 

    })
    
    
}

