const express = require('express');

const router = express.Router();

const postController = require('../controllers/post_controlller');
const passport = require('passport');

router.post('/create' , postController.create);



module.exports =  router;