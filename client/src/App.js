import React, {useState} from 'react';
import './App.css';
import {Router} from '@reach/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './views/Registration';
import Main from './views/Main';
import Login from './views/Login';


function App() {

  const [logged, setLogged] = useState(null);

  return (
    <div className="App">
      <Router>
        <Registration path="/" setLogged={setLogged}/>
        <Main path="/dashboard" logged={logged} setLogged={setLogged}/>
        <Login path="/login" setLogged={setLogged}/>
      </Router>
    </div>
  );
}

export default App;
