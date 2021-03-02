const express = require('express')
const router = express.Router({ mergeParams: true })
const asyncCatch = require('../utils/asyncCatch')
const Reviews = require('../controllers/reviews')
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware')

router.post('/', validateReview, isLoggedIn, asyncCatch(Reviews.postReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, asyncCatch(Reviews.deleteReview));

module.exports = router