import './App.css';
import {Router} from '@reach/router'
import 'bootstrap/dist/css/bootstrap.min.css'

import Registration from "./views/Registration";
import Main from "./views/Main";
import CreateReview from "./components/ReviewForm";


function App() {
  return (
    <div className="App">
      <Router>
        <Registration path="/register" />
        <Main path="/" />
        <CreateReview path="/comment/page/:_id" />
      </Router>
    </div>
  );
}

export default App;
