import React, {useState} from 'react';
import axios from "axios";
import Navbar from "../components/Navbar";
import Search from '../components/Search';
 
const Main = (props) => {

    const [picture, setPicture] = useState([]); //need to specify that there is an object coming in with the []

    const onClickHandler = () => {
        axios.get("https://pixabay.com/api/?key=19524930-615e099e88fa1398dd638fdb1")
        .then(res => console.log(res.data ))
        // .then(res => setPokemon(res.data.results))
        .catch(console.log("There was an error when clicking the button"))
        // ecd4236ea24690dfe9e82564ab3bedf6
    }


    return(
        <div>
            <Navbar />
            <Search />
            <button onClick={onClickHandler}>CLick me!</button>

        <ol>
    {
        picture.map((pic, i) => {
        // .map creates a new array with the results of calling a function for every array element, taking it out from the state
        return <li key={i} > {pic.hits} </li>
        // .name is specific to the api you'll need to look inside it before using, we are cycling through the names
        })
    }
        </ol>
        </div>
    );
}

export default Main;