module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for Codial</h1>')
    return res.render('home' ,{
        title: "HOME"
    });
}