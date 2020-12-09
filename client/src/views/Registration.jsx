import React, {useState} from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { navigate, Link } from '@reach/router';


const Registration = (props) => {
    // The logic for each form that I will be passing in will be different for the registration and edit pages

    const {setLogged} = props;
    
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "", //still needed to include the state "placeholder" for confirm password even though it is not going into our db
    })

    const [error, setError] = useState({});

    const onChangeHandler = (eventProp) => { //we will be using this to update our data as we fill out the form, check console to see
        eventProp.preventDefault(); //preventDefault is called on the event when submitting the form to prevent a browser reload/refresh. Try the code without it to see what happens.
        setForm({
            ...form,
            [eventProp.target.name]: eventProp.target.value //WHY IS IT .name???
            //this needs to be eventProp.target.name so that the component in the form updates
            //.target.value retrieves the value of whatever input it was called on, so whatever I insert in input can be accessed through event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        //this needs to be eventProp.target.name so that the component in the form updates
        //.target.value retrieves the value of whatever input it was called on, so whatever I insert in input can be accessed through event.target.value
        axios.post("http://localhost:8000/api/new/user", form, {withCredentials:true}) //WHY IS form WRITTEN HERE? IMPORTANT: We need the withCredentials:true for every axios route we put in!!!!!
        .then(res => {                                                                 //We need the withCredentials:true to make the json web token and cookie, if we dont add this here it wont be made
            if(res.data.error){ //this is basically asking res.data if it has any errors in it
                console.log(res.data.error.errors)
                setError(res.data.error.errors) //go over what we are doing here (OOOOOOOOOOOOOOOOO)
            } else {
                console.log("Hey, our on submit worked!") //otherwise if all is good, let this happen then
                navigate("/dashboard") //navigates back to our front page 
            }
        })
        .catch(console.log("Hey, something went wrong"))
    } 

    return(
        <div>
            <h2>Register To Use Jikan</h2>
            {/* Need to pass onChangeHandler into form to use it */}
            <Form onSubmitHandler={onSubmitHandler} form={form} onChangeHandler={onChangeHandler} error={error} />
            <p><Link to="/login"> Already a member? Login Here</Link></p>
        </div>
    )
}

export default Registration;