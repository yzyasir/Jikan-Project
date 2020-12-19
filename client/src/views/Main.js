import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Search from '../components/Search';
 
const Main = (props) => {

    return(
        <div>
            <Navbar /> 
            <Search />
       
        </div>
    );
}

export default Main;