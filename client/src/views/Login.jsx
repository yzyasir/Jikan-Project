import { navigate, Link } from '@reach/router';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Login = (props) => {

    const [log, setLog] = useState({
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        e.preventDefault();
        setLog({
            ...log,
            [e.target.name]: e.target.value
        })
    }

    const [error, setError] = useState({})

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", log, { withCredentials: true })
            .then(res => {
                if (res.data.error) {
                    console.log(res.data.error.errors)
                    setError(res.data.error.errors)
                } else {
                    console.log("Hey, our login submit worked!")
                    navigate("/dashboard")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Login to use Jikan</h2>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" className="form-control" onChange={onChangeHandler} value={props.email}></input>

                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" name="password" className="form-control" onChange={onChangeHandler} value={props.password}></input>

                        </div>
                        <input type="submit" value="Submit" className="btn btn-primary"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;