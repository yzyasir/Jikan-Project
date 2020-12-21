import React from 'react';

const ReviewForm = (props) => {

    return(
        <div>
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
                <form onSubmit={props.onSubmitHandler}>
                <div className="form-group">
                        <label>Write a Review</label>
                        {/* reviewForm is the state in the createReview page, not the setState */}
                        <input type="text" name="review" className="form-control" onChange={props.onChangeHandler} value={props.reviewForm.review}></input> 
                        { //we are passing our errors through props
                            props.error.review ?
                        <span>{props.error.review.message}</span>
                        : ""
                        } 
                </div>
                <input type="submit" value="Submit" className="btn btn-primary"></input>
                </form>
            </div>
            <dov className="col-sm-2"></dov>
        </div>
    )
}
export default ReviewForm;