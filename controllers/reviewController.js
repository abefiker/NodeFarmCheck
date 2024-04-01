const Review = require('../models/reviewModel')
const catchAsync = require('../utils/catchAsync')
exports.createReview = catchAsync(async (req, res, next) => {
    //Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId
    if (!req.body.user) req.body.user = req.user.id
    const newReview = await Review.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    })
})
exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find().select('-__v')
    res.status(200).json({
        status: 'Success',
        result: reviews.length,
        data: reviews
    })
})