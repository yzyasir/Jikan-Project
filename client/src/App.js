import './App.css';
import {Router} from '@reach/router'
import 'bootstrap/dist/css/bootstrap.min.css'

import Registration from "./views/Registration";
import Spare from "./views/Spare"


function App() {
  return (
    <div className="App">
      <Router>
        <Spare path="/" />
        <Registration path="/create" />
      </Router>
    </div>
  );
}

export default App;
