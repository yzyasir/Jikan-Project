import React from 'react';
import '../components/Search.css'; //we do double dots to get out of directory
import axios from 'axios'; //this is also where we get out canceltoken, gives data in json format automatically

class Search extends React.Component {

    constructor(props){
        super(props); //all class constructors must call super is they are subclasses, must call super as long as you have a constructor. This will allow us to use props.
        
        this.state = { //we are now able to usr this after the super
            query: '', //we will store the query info here
            results: {}, //we need this to store the results that we recieve from the api
            loading: false, //we want to show loading while the query is being fetched
            message: '' //want to show the message if there is an error or if there is no data available
        }
        this.cancel = ''; //you cancel a request using a cancel token. This is an axios api based cancel token. Cancels the previous request. 
        // you put the token into a constructor and set it to empty, WHY DOES IT GO IN THE CONSTRUCTOR?
    }

    fetchSearchResults = (updatedPageNumber = '', query) => { //initially the number will be 1 but when we intruduce pagenation, it will update page numbers, and it will also take the query we typed in inside the query
        const pageNumber = updatedPageNumber ? `&page=${updatedPageNumber}` : '' //says, if we have any value, lets set the page number dynamically
        const searchUrl = `https://pixabay.com/api/?key=19524930-615e099e88fa1398dd638fdb1&q=${query}${pageNumber}` //in backtick because we need to put in information dynamically
        console.log("before the if")
        // cancel token is necessary because you are making a request every time you type, this is making too many calls, so we do the code below to only search after we are done typing
        if (this.cancel ){ //checks if this.cancel has any value 
            this.cancel.cancel(); //if there is a value, then go ahead and cancel the request here, CANCEL TOKEN HAS GOOD DOCUMENTAION FROM AXIOS
        console.log("in the if")
        }
        this.cancel = axios.CancelToken.source(); //if the if statement fails, this line here creates a new cancel token and then sets it equal to this.cancel (it is now stored in cancel)
        console.log("after storing the token")
        axios.get(searchUrl, {cancelToken: this.cancel.token} ) //we already made the const for the request, now just plug it in, check the cancelToken documentary to understand the "source.token"
        // .then( res => console.warn(res.data.hits)) //HERE ABOVE
        .then( res => {
            const resultNotFoundMessage = ! res.data.hits.length ? 'There are no more search results. Please try again' : '' //BREAK THIS TERNARY DOWN //its .length because its an array
            this.setState({
                results: res.data.hits, //what you looked for
                message: resultNotFoundMessage, //its the same message above
                loading: false //You have recieved your query, no more need for loader
            })}) //this is the info we want to show the user in case the result was not found
        .catch(err => {
            if(axios.isCancel(err) || err) { //if there is an error from axios in canceling a request, or if there is any other error (|| this means if there is any other error)
                this.setState(
                    { 
                    loading: false, //doesnt load or show the loader
                    message: "failed to fetch the data, please check the network"
                }) //Adding the {} fixes it because you need to wrap that property initializer in an object literal, so you're passing an object as the second argument to get
            }
        })
    }

    handleOnInputChange = (event) => {
        const query = event.target.value; //we are storing the query we type in into a const called query, then the query will be available inside event.target.value 
        // console.warn(query);   //if you want to make sure, that something only happens after you have certain information set in a state (below) you can do a callback function
        if ( ! query ) { //if query is empty, then pass in an empty results array and it will be shown as empty when search bar is also empty
            this.setState( {query, results: {}, message: ''}) 
        } else {
            this.setState( {query: query, loading: true, message: ''} , () => { //HERE IT GOES WRONG it = needed to be an anonymous function not stated as a callback, query : query is the property() name and property value
                this.fetchSearchResults(1, query)}  //we do this here because setState is asynchronous, so for this reason, we use a callback, which only works after all of the prior info is set in state
                ); //message is empty so if there was any message set prior it can be used
                //loading is true so we can show the loader (necessary for when we call the api)
        }
    };

    renderSearchResults = () => {
        const {results} = this.state; //pulling results out of state
        if ( Object.keys(results).length && results.length){ //first we are going to check if there is anything coming in (if weve got the data or not), since results is an object, we use the method Object.keys() and put results in it
            return(
                <div className = "results-container">
                    {results.map( resultsItem => {
                        return( //key needs to be unique, so we use the id to make it unique
                            <a key={resultsItem.id} href={resultsItem.previewURL} className="results-item"> 
                                <h6 className="image-username">{resultsItem.user}</h6>
                                <div className="image-wrapper">
                                    <img src={resultsItem.previewURL} alt={`${resultsItem.username} image`} className="image"/> 
                                </div>
                            </a> //now we can put this function into a render function (this is for cleanliness, not to make our render below too long)
                        )
                    })}

                </div>
            )
        } 
    }

    render() {
        const {query, message} = this.state; //we are pulling query from here using object destructuring (pulling query out of state and placing it inside this constant) this is es6
        // console.warn(this.state); //whatever the user types, is appended to the query
        return(
            <div className="container">
                <h2 className="heading">Search Pictures: Find and Comment!</h2>
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        name="query" //CHECK WHAT THIS DOES AGAIN
                        value={ query } //later we will put in the states query into here
                        id="search-input" //this is the same as we put in for htmlFor
                        placeholder="Search!" //this is what goes inside 
                        onChange={this.handleOnInputChange} //WHY USE .THIS HERE
                    />
                     <i className="fas fa-search search-icon" aria-hidden="true"></i> 
                </label> {/* must use className instead of class, this i tag is import from font awesome for the seacrh icon, basically just for html */}

                {/* Error Message */} {/* we had to pull message out of the state above, aka including it in the const*/}
                {message && <p className="message"> { message }</p>} {/* purpose for the && is that is message is true, then whatever is right of && is displayed*/}

                {/* Results Below */}
                {this.renderSearchResults()}
            </div> 
        )
    }
}

export default Search;