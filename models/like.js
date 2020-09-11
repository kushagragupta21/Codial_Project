const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    
    //This defines the object id of the liked Objects
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath:  'onModel'  //Used for this is dynamic refrance

    },

    //this feild is used for defining the type the liked objects since this is dynamic refrances
    onModel: {
        type: String,
        required: true,
        enum: ['Post','Comment']  //denotes value of onModel in databse is either like or comment only.
        
    }



},{ 
    timestamps: true,

});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;