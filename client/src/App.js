import './App.css';
import {Router, Link} from '@reach/router'
import 'bootstrap/dist/css/bootstrap.min.css'

import HomePage from "./views/HomePage";


function App() {
  return (
    <div className="App">
      <Router>
        <HomePage path="/" />
      </Router>
    </div>
  );
}

export default App;
