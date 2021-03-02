const express = require('express')
const router = express.Router()
const asyncCatch = require('../utils/asyncCatch')
const { isLoggedIn } = require('../middleware')
const { isAuthor } = require('../middleware')
const { validateCampground } = require('../middleware')
const campgrounds = require('../controllers/campgrounds')


router.route('/')
    .get(asyncCatch(campgrounds.index))
    .post(isLoggedIn, validateCampground, asyncCatch(campgrounds.createCamp))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(asyncCatch(campgrounds.indivisualCamp))
    .put(isLoggedIn, validateCampground, isAuthor, asyncCatch(campgrounds.updateCamp))
    .delete(isLoggedIn, isAuthor, asyncCatch(campgrounds.deleteCamp));


router.get('/:id/edit', isLoggedIn, isAuthor, asyncCatch(campgrounds.renderEditForm))




module.exports = router