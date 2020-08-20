const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create' , passport.checkAuthentication, commentsController.create);
//checkAuthentication is a function which we will created at config/passport-local-stretegy.js


module.exports =  router;