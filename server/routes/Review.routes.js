// need to connect the controller to the routes
const ReviewController = require("../controllers/Reviews.controllers");

module.exports = app => {
    app.post("/api/new/review", ReviewController.createReview) //called the function from the file
    app.get("/api/getAll/reviews", ReviewController.findAllReviews)
    app.get("/api/findOne/review/:id", ReviewController.findOneReview)
    app.delete("/api/deleteOne/review/:id", ReviewController.deleteOneReview)
    app.put("/api/update/review/:id", ReviewController.updateReview)
}