const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/codial_devloment');


const db =mongoose.connection;

db.on('error', console.error.bind(console,"Error connecting to mongo db"));


db.once('open',function(){
    console.log('connect to database :: MongoDB');

});


module.exports = db;