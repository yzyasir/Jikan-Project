const { default: Axios } = require("axios")

import React from 'react';
import Axios from 'axios';
import {navigate} from 'navigate'

const Logout = props => {

    const handleLogout = () => {
        // need to hit the route to log out
        // need to clear setLogged as well, then navigate
        Axios.get("http://localhost:8000/api/logout", {withCredentials: true})
            .then(res => {
                setLogged(null); //by setting setLogged to null, we are clearing our cookie history?
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return(
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    )
}
export default Logout;