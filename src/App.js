import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Facility from './components/Facility';
import User from './components/User';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import ActCable from './components/ActCable';

function App(){
  return(
    <Router>
    <div className="row">
        <div className="col-mid-8 fill-window">
          <Route exact path="/facility" component={Facility} />
          <Route exact path="/user" component={User} />
          <Route exact path="/activity-cable" component={ActCable} />
        </div>
    </div>
    </Router>
  )
}

export default App;