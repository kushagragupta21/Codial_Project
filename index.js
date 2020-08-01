const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();

const port = 8000; //Generally Website run on port 80

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());  //Use for writing cookie

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and script from sub-pages into the layout
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);





//use express router
app.use('/' , require('./routes'));

// set up the view engine (By npm instal ejs)
app.set('view engine' , 'ejs');
app.set('views', './views');


app.listen(port,function(err){
    if(err)
    {
    console.log(`Error in running the Server: ${err}`);   //interpolation 
               // console.log('Error in running the Server: ',err);
    }

    console.log(`Server is running on port: ${port}` );

});