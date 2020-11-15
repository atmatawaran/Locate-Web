import React, {useState, useEffect} from "react";
import FacilityForm from "./FacilityForm";
import { db, auth } from "./firebase";

const Facility = () => {

    var [facilityObjects,setFacilityObjects] = useState({});
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);

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
            db.collection('facilities').doc(facilityObjects[currentId].id)
            .update({
                fac_id: obj.fac_id,
                fac_type: obj.fac_type,
                fac_info: obj.fac_info,
                fac_address: obj.fac_address
            
            })
            .then(function() {
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
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <b><h2> Manage Facilities </h2></b>
            </ol>
        </nav>

        <div className="row">
            <div className="col-md-5">
                <FacilityForm {...({addOrEdit,currentId,facilityObjects,disabled})}/>
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
                                    {/* <a style={{marginRight: 20}} className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a> */}
                                        <a style={{marginRight: 20}} className="btn btn-primary" onClick={ function(event){ setCurrentId(id); setDisabled(false)} }>Edit</a>
                                        {/* function(event){ func1(); func2()} */}
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