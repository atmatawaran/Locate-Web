import React, {useState, useEffect} from "react";
import ActCable_Form from "./ActCable_Form";
import { db, auth } from "./firebase";
import './ActCable.css';

import { Button, Table } from 'react-bootstrap';

const ActCable = () => {

    var [cableObjects,setCableObjects] = useState({});
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);
    var [input, setInput] = useState("");

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
                setDisabled(true);
            });

        }
    }

    const onDelete = (id,act_no) =>{
        if(window.confirm("Delete this document?")){

            db.collection('activities') .where('activity_no', '==', act_no).get().then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });

            db.collection('activities_cable').doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            });
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    if(input.length > 0) {
        cableObjects = cableObjects.filter((i) => {
            return i.addedbyUser.join().includes(input)
        })
    }

    const ref = React.createRef();

    return(
    <>  
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb parent-button">
                    <b><h2  style={{marginLeft: 35}}> Manage Cable Activities </h2></b>
                </ol>
        </nav>

        <div className="row">
            <div className="col-md-5">
                <ActCable_Form {...({addOrEdit,currentId,cableObjects,disabled})}/>
            </div>
            
            <div className="col-md-7">

                <input type="text" 
                style={{display: "block", "width": "100%", "padding" : "7px", marginBottom : 10}} 
                placeholder="Search by user"
                onChange={handleChange}/>

                <Table bordered hover>
                    <thead className="thead-light">
                        <tr>
                            <th> Activity ID </th>
                            <th> Added by </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(cableObjects).map(id =>{
                                return <tr key={id}>
                                    <td>{cableObjects[id].activity_no}</td>
                                    <td>{cableObjects[id].addedbyUser.map((username, index) =>
                                        <p style={{margin:0}} key={index}>{username}</p>)
                                    }</td>
                                    <td>
                                    {/* <a style={{marginRight: 20}} className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a> */}
                                        <a style={{marginRight: 20}} className="btn btn-primary" onClick={ function(event){ setCurrentId(id); setDisabled(false)} }>Edit</a>
                                        {/* function(event){ func1(); func2()} */}
                                        <a className="btn btn-danger"  onClick={()=> {onDelete(cableObjects[id].id, cableObjects[id].activity_no)}}>Delete</a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>

    </>

    );
}

export default ActCable;