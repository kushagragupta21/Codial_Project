const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }


},{timestamps: true //To save the time when it was created and updated

});

const User = mongoose.model('user',userSchema);

module.exports = User;
