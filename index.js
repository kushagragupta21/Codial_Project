const express = require('express');

const app = express();

const port = 8000; //Generally Website run on port 80






app.listen(port,function(err){
    if(err)
    {
    console.log(`Error in running the Server: ${err}`);   //interpolation 
               // console.log('Error in running the Server: ',err);
    }

    console.log(`Server is running on port: ${port}` );

});