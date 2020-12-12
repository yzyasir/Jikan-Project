import './App.css';
import {Router} from '@reach/router'
import 'bootstrap/dist/css/bootstrap.min.css'

import Registration from "./views/Registration";
import Main from "./views/Main";
import Navbar from './components/Navbar';



function App() {
  return (
    <div className="App">
      <Router>
        <Registration path="/register" />
        <Main path="/" />
      </Router>
    </div>
  );
}

export default App;
