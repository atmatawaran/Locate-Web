import React, {useState, useEffect} from "react";
import ActCable_Form from "./ActCable_Form";
import { db, auth } from "./firebase";

const ActCable = () => {

    var [cableObjects,setCableObjects] = useState({});
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);

    // similar to componentDidMount
    useEffect(() =>{
        db.collection("activities_cable").onSnapshot(function(data){
            console.log(data);
            setCableObjects(data.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            })))
        })
    },[])


    const addOrEdit = obj => {
        if(currentId == ''){
            db.collection('activities_cable').add(obj).then(function() {
                console.log(currentId)
                console.log("Document successfully added!");
                setCurrentId('')
            });
            console.log("added")
        }
        else{
            db.collection('activities_cable').doc(cableObjects[currentId].id)
            .update({
                cable_owner: obj.cable_owner,
                cable_cond: obj.cable_cond,
                cable_clear_obst: obj.cable_clear_obst,
                cable_low_sag: obj.cable_low_sag,
                cable_exposed: obj.cable_exposed,
                cable_remarks: obj.cable_remarks,
                cable_find_recc: obj.cable_find_recc
            
            })
            .then(function() {
                alert("Document successfully updated!");
                setCurrentId('')
            });

        }
    }

    const onDelete = id =>{
        if(window.confirm("Delete this document?")){
            db.collection('activities_cable').doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            });
        }
    }

    return(
    <>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4" text-center>Manage Cable Activities</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <ActCable_Form {...({addOrEdit,currentId,cableObjects,disabled})}/>
            </div>
            <div className="col-md-7">
                <table className="table table-borderless table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th> Activity ID </th>
                            <th> Activity Type </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(cableObjects).map(id =>{
                                return <tr key={id}>
                                    <td>{cableObjects[id].activity_no}</td>
                                    <td>{cableObjects[id].activity_type}</td>
                                    <td>
                                    {/* <a style={{marginRight: 20}} className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a> */}
                                        <a style={{marginRight: 20}} className="btn btn-primary" onClick={ function(event){ setCurrentId(id); setDisabled(false)} }>Edit</a>
                                        {/* function(event){ func1(); func2()} */}
                                        <a className="btn btn-danger"  onClick={()=> {onDelete(cableObjects[id].id)}}>Delete</a>
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

export default ActCable;