const express = require('express')
const passport = require('passport')
const router = express.Router()
const catchAsync = require('../utils/asyncCatch')
const users = require('../controllers/users')

router.route('/register')
    .get(users.registerRender)
    .post(catchAsync(users.registerPost))

router.get('/logout', users.logoout)

router.route('/login')
    .get(users.loginRender)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)


module.exports = router