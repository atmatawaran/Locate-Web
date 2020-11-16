import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Facility from './components/Facility';
import User from './components/User';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import ActCable from './components/ActCable';
import ActManhole from './components/ActManhole';
import ActCabinet from './components/ActCabinet';
import ActPole from './components/ActPole';

function App(){
  return(
    <Router>
    <div className="row">
        <div className="col-mid-8 fill-window">
          <Route exact path="/facility" component={Facility} />
          <Route exact path="/user" component={User} />
          <Route exact path="/activity-cable" component={ActCable}/>
          <Route exact path="/activity-manhole" component={ActManhole} />
          <Route exact path="/activity-cabinet" component={ActCabinet} />
          <Route exact path="/activity-pole" component={ActPole} />
        </div>
    </div>
    </Router>
  )
}

export default App;