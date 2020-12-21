import React, {useState} from 'react';
import ReviewForm from '../components/ReviewForm';
import Navbar from '../components/Navbar';
import axios from 'axios';

const CreateReview = (props) => {

    const [reviewForm, setReviewForm] = useState({
        review: ""
    })

    const [error, setError] = useState({})

    const onChangeHandler = (event) => {
        eventProp.preventDefault();
        setReviewForm({
            ...reviewForm,
            [eventProp.target.review]: eventProp.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/new/review/:id", reviewForm)
            .then(res => {
                if(res.data.error) {
                    console.log(res.data.error.errors)
                    setError(res.data.error.errors)
                } else {
                    console.log("on submit worked for reviews")
                }
            })
            .catch(console.log("something went wrong"))
    }

    return(
        <div>
            <Navbar />
            <h2>Comment On This Picture</h2>
            <ReviewForm reviewForm={reviewForm} onChangeHandler={onChangeHandler} error={error} />
        </div>
    )

}

export default CreateReview;