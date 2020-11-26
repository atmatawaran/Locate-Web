import React from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Facility from './components/Facility';
import User from './components/User';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ActCable from './components/ActCable';
import ActManhole from './components/ActManhole';
import ActCabinet from './components/ActCabinet';
import ActPole from './components/ActPole';
import ActDp from './components/ActDp';
import Map from './components/Map'
import Navbar from './components/Navbar';

function App(){
  return(
    <Router>
        <Navbar/>
        <Switch>
        <div className="row">
        <div className="col-mid-8 fill-window">
        {/* <Route exact path="/facility" component={Facility} /> */}
          <Route exact path="/authenticate-users" component={User} />
          <Route exact path="/activities-cable" component={ActCable}/>
          <Route exact path="/activities-manhole" component={ActManhole} />
          <Route exact path="/activities-cabinet" component={ActCabinet} />
          <Route exact path="/activities-pole" component={ActPole} />
          <Route exact path="/activities-dp" component={ActDp} />
          <Route exact path="/" component={Map} />
          </div>
          </div>
        </Switch>
    </Router>
  )
}

export default App;