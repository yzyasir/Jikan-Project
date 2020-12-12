import React, {useState} from 'react';
import axios from "axios";

const Main = (props) => {

    const [pokemon, setPokemon] = useState([]); //need to specify that there is an object coming in with the []

    const onClickHandler = () => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
        // .then(res => console.log(res.data.results))
        .then(res => setPokemon(res.data.results))
        .catch(console.log("There was an error when clicking the button"))
    }


    return(
        <div>
            <button onClick={onClickHandler}>CLick me!</button>

        <ol>
    {
        pokemon.map((pokem, i) => {
        // .map creates a new array with the results of calling a function for every array element, taking it out from the state
        return <li> <p key={i} >{pokem.name}</p> </li>
        // .name is specific to the api you'll need to look inside it before using, we are cycling through the names
        })
    }
        </ol>
        </div>
    );
}

export default Main;