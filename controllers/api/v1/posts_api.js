const Post = require('../../../models/post');

module.exports.index = async function(req, res){
  
  
  
  
    let posts = await Post.find({})
    .sort('-createdAt') //sort decending (means last post created shown first) to creation time
    .populate('user')
    .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
  
    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
 
    try{
        let post = await  Post.findById(req.params.id) ;

            // .id means converting the object id into string 
            //for likes
         

            // if (post.user == req.user.id) {

                post.remove();

            await Comment.deleteMany({ post: req.params.id });
            
           return res.json(200,{
               message: 'Post associated comments deleted successfully'
           })

            // req.flash('success','Post and associtated comments deleted!');
            return res.redirect('back');
        // } else {
        //     req.flash('error','You Cannot delete this post');
        //     return res.status(401).json({
        //         message: "Post cannot deleted "
        //     });

        // }

     }
    catch(err)
        {

            // console.log('Error',err);
            // req.flash('error',err);
            return res.json(500),{
                message: 'Interval server error'
            };
        }
        
 }