const mongoose = require("mongoose"); 

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Must write a review before submission"],
        minlength: [5, "At least write a full sentence"]
    },
    userId: {
        type: String
    }
}, 
{
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
}
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;

// Add the id of the anime into the model, check which data type it is