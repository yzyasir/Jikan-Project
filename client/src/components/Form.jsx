import React from 'react';

const Form = (props) => {
    return(
        <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
                <form onSubmit={props.onSubmitHandler}> 
                {/* the onSubmit logic is from the create author */}
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" className="form-control" onChange={props.onChangeHandler} value={props.form.firstName}></input>
                        { //we are passing our errors through props
                            props.error.firstName ?
                        <span>{props.error.firstName.message}</span>
                        : ""
                        } 
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" className="form-control" onChange={props.onChangeHandler} value={props.form.lastName}></input>
                        { //we are passing our errors through props
                            props.error.lastName ?
                        <span>{props.error.lastName.message}</span>
                        : ""
                        }
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" className="form-control" onChange={props.onChangeHandler} value={props.form.email}></input>
                        { //we are passing our errors through props
                            props.error.email ?
                        <span>{props.error.email.message}</span>
                        : ""
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" name="password" className="form-control" onChange={props.onChangeHandler} value={props.form.password}></input>
                        { //we are passing our errors through props
                            props.error.password ?
                        <span>{props.error.password.message}</span>
                        : ""
                        }
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="text" name="confirmPassword" className="form-control" onChange={props.onChangeHandler} value={props.form.confirmPassword}></input>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary"></input>
                </form>
            </div>
            <div className="col-sm-2"></div>
        </div>
    )
}
export default Form;