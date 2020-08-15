module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for Codial</h1>')
   
    console.log(req.cookies); //req the cokkie from browser
    res.cookie('user_id' , 25); //to change the value of cookie
    
    return res.render('home' ,{
        title: "HOME"
    });
}