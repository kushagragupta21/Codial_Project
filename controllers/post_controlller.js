const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function (req, res) {
    try{
       let post =  await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){   // xhr= XMLHttpRequest 
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            })
        }

        req.flash('success','Post published!');
        return res.redirect('back');
    }catch(err){

        // console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
    
    

}


module.exports.destroy = async function (req, res) {
 
    try{
        let post = await  Post.findById(req.params.id) ;

            // .id means converting the object id into string 
            //for likes
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            if (post.user == req.user.id) {

                post.remove();

            await Comment.deleteMany({ post: req.params.id });
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted "
                });
            }

            req.flash('success','Post and associtated comments deleted!');
            return res.redirect('back');
        } else {
            req.flash('error','You Cannot delete this post');
            return res.status(401).json({
                message: "Post cannot deleted "
            });

        }

     }
    catch(err)
        {

            // console.log('Error',err);
            req.flash('error',err);
            return res.redirect('back');
        }
        
 }