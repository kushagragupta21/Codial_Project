const express = require('express');

const router = express.Router();

const postController = require('../controllers/post_controlller');
const passport = require('passport');

router.post('/create' , postController.create);
//checkAuthentication is a function which we will created at config/passport-local-stretegy.js
// , passport.checkAuthentication

module.exports =  router;