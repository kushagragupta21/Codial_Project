const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();

const port = 8000; //Generally Website run on port 80

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//for google oauth 
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//Used for Mongo Store
const MongoStore = require('connect-mongo')(session);

//For Sass-middleware
const sassMiddleware = require('node-sass-middleware');
const e = require('express');

//for flash messages
const flash = require('connect-flash');

//requiring own custom middleware
const customMware = require('./config/middleware');



app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css/'
 


}));



app.use(express.urlencoded());

app.use(cookieParser());  //Use for writing cookie

app.use(express.static('./assets'));

//make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(expressLayouts);

//extract style and script from sub-pages into the layout
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);


// set up the view engine (By npm instal ejs)
app.set('view engine' , 'ejs');
app.set('views', './views');


//Mongo store is used to store the session cookie in the db
app.use(session({   //Middleware for session
    name: 'codial',
    //TODO change the scret before deployment in production mode
    secret:  'blahsomthing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)  //Use time in millisecounds
    },

        store: new MongoStore( // Use for mongo store
            {
                mongooseConnection: db,
                autoRemove: 'disabled'
            },

            function(err){
                console.log(err || 'connect-mongodb setup ok');
            }
        )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAunthenticatdUser);


app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/' , require('./routes'));




app.listen(port,function(err){
    if(err)
    {
    console.log(`Error in running the Server: ${err}`);   //interpolation 
               // console.log('Error in running the Server: ',err);
    }

    console.log(`Server is running on port: ${port}` );

});