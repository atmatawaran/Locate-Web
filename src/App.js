import React from 'react';
import Facility from './components/Facility';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App(){
  return(
    <div className="row">
        <div className="col-mid-8 fill-window">
          <Facility/>
        </div>
    </div>
  )
}

export default App;