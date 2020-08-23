const Post = require('../models/post');

const User = require('../models/user');

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

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
    
    .exec(function(err,posts){
        // if(err)
        // {
        //     console.log(err);
        //     return;
        // }
        User.find({},function(err,users){
            return res.render('home',{
                title: "Codial | Home",
                posts: posts,
                all_users: users
                             
            }); 
    
        });

        
    })
    
    


}