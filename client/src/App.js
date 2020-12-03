import './App.css';
import {Router} from '@reach/router'
import 'bootstrap/dist/css/bootstrap.min.css'

import Registration from "./views/Registration";


function App() {
  return (
    <div className="App">
      <Router>
        <Registration path="/" />
      </Router>
    </div>
  );
}

export default App;
