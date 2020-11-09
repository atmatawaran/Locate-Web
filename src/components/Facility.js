import React, {useState, useEffect} from "react";
import FacilityForm from "./FacilityForm";
import { db, auth } from "./firebase";

const Facility = () => {

    // similar to componentDidMount
    var [facilityObjects,setFacilityObjects] = useState({});

    // useEffect(() =>{
    //     db.collection("facilities").onSnapshot(function(data){
    //         console.log(data);
    //         setFacilityObjects(data.docs.map(doc => ({
    //             ...doc.data()
    //         })))
    // },[])

    useEffect(() =>{
        db.collection("facilities").onSnapshot(function(data){
            console.log(data);
            setFacilityObjects(data.docs.map(doc => ({
                ...doc.data()
            })))
        })
    },[])


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
                <table className="table table-borderless table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th> Facility Name </th>
                            <th> Facility Type </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(facilityObjects).map(id =>{
                                return <tr key={id}>
                                    <td>{facilityObjects[id].fac_id}</td>
                                    <td>{facilityObjects[id].fac_type}</td>
                                    <td>
                                        <a className="btn btn-primary">Edit</a>&nbsp;
                                        <a className="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    </>

    );
}

export default Facility;