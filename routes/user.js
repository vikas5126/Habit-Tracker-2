const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/user_controller');

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',{failRedirect: '/user/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;