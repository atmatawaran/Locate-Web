import React, {useState, useEffect} from "react";
import FacilityForm from "./FacilityForm";
import { db, auth } from "./firebase";

const Facility = () => {

    var [facilityObjects,setFacilityObjects] = useState({});
    var [currentId, setCurrentId] = useState('');

    // similar to componentDidMount
    useEffect(() =>{
        db.collection("facilities").onSnapshot(function(data){
            console.log(data);
            setFacilityObjects(data.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            })))
        })
    },[])


    const addOrEdit = obj => {
        if(currentId == ''){
            db.collection('facilities').add(obj).then(function() {
                console.log(currentId)
                console.log("Document successfully added!");
                setCurrentId('')
            });
            console.log("added")
        }
        else{
            db.collection('facilities').doc(facilityObjects[currentId].id).set(obj).then(function() {
                console.log("Document successfully updated!");
                setCurrentId('')
            });
        }
    }

    const onDelete = id =>{
        if(window.confirm("Delete this document?")){
            db.collection('facilities').doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            });
        }
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
                <FacilityForm {...({addOrEdit,currentId,facilityObjects})}/>
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
                                        <a className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a>&nbsp;
                                        <a className="btn btn-danger"  onClick={()=> {onDelete(facilityObjects[id].id)}}>Delete</a>
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