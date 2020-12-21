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

    useEffect(() => {
        axios.get(`https://pixabay.com/api/?key=19524930-615e099e88fa1398dd638fdb1/${props._id}`) //need to pull the id through props
        .then(res => {
            console.log(res)
        }, [])
        .catch("there was an error in the pic api call")
    })

    return(
        <div>
            <Navbar />
            <div>
                <a href>

                </a>
            </div>
            <h2>Comment On This Picture</h2>
            <ReviewForm reviewForm={reviewForm} onChangeHandler={onChangeHandler} error={error} />
        </div>
    )

}

export default CreateReview;