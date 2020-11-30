const Review = require("../models/Reviews.model");

module.exports.createReview = (req, res) => {
    Review.create(req.body)
        .then(newReview => res.json({message: "Success, you submitted a review", review: newReview}))
        .catch(err => res.json({message: "Hey, something went worng", error: err}))
}

module.exports.findAllReviews = (req, res) => {
    Review.find(req.body)
    .then(allReviews => res.json({message: "Success, we found all reviews", review: allReviews}))
    .catch(err => res.json({message: "Hey, something went wrong", error: err}))
}

// ___________________________________________________________________________________________
module.exports.findOneReview = (req, res) => {
    Review.findOne({_id: req.params.id})
        .then(oneReview => res.json({message: "Success, you found one review", review: oneReview}))
        .catch(err => res.json({message: "Hey, something went wrong", error: err}))
}

module.exports.updateReview = (req, res) => {
    Review.update({_id: req.params.id}, {
        $set: {
            review: req.body.review,
            userId: req.body.userId
        }
    }, {runValidators: true})
        .then(updatedReview => res.json({review: updatedReview}))
        .catch(err => res.json({message: "Hey the update failed", error: err}))
}

module.exports.deleteOneReview = (req, res) => {
    Review.remove({_id: req.params.id})
        .then(res.json({message: "Success, you deleted a review"}))
        .catch(err => res.json({message: "Hey, something went wrong", error: err}))
}

