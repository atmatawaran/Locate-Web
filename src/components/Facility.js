import React from "react";
import FacilityForm from "./FacilityForm";
import { db, auth } from "./firebase";

const Facility = () => {

    const addOrEdit = obj => {
        console.log(obj);
        db.collection('facilities').add(obj);
    }

    return(
    <>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4" text-center>Add Facility</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <FacilityForm addOrEdit={addOrEdit}/>
            </div>
            <div className="col-md-7">
                <div>List of Facilities</div>
            </div>
        </div>

    </>

    );
}

export default Facility;