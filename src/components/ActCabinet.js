import React, {useState, useEffect} from "react";
import ActCabinet_Form from "./ActCabinet_Form";
import { db, auth } from "./firebase";

const ActCabinet = () => {

    var [cabinetObjects,setCabinetObjects] = useState({});
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);
    var [input, setInput] = useState("");

    // similar to componentDidMount
    useEffect(() =>{
        db.collection("activities_cabinet").onSnapshot(function(data){
            console.log(data);
            setCabinetObjects(data.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            })))
        })
    },[])


    const addOrEdit = obj => {
        if(currentId == ''){
            db.collection('activities_cabinet').add(obj).then(function() {
                console.log(currentId)
                console.log("Document successfully added!");
                setCurrentId('')
            });
            console.log("added")
        }
        else{
            db.collection('activities_cabinet').doc(cabinetObjects[currentId].id)
            .update({
                cab_door: obj.cab_door,
                cab_terminal: obj.cab_terminal,
                cab_jumper: obj.cab_jumper,
                cab_lock: obj.cab_lock,
                cab_port: obj.cab_port,
                cab_ground: obj.cab_ground,
                cab_ovoc: obj.cab_ovoc,
                cab_remarks: obj.cab_remarks,
                cab_find_recc: obj.cab_find_recc
            })
            .then(function() {
                alert("Document successfully updated!");
                setCurrentId('');
                setDisabled(true);
            });

        }
    }

    const onDelete = (id,act_no) =>{
        if(window.confirm("Delete this document?")){

            db.collection('activities') .where('activity_no', '==', act_no).get().then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });

            db.collection('activities_cabinet').doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            });
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    if(input.length > 0) {
        cabinetObjects = cabinetObjects.filter((i) => {
            return i.addedbyUser.join().includes(input)
        })
    }

    return(
    <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <b><h2 style={{marginLeft: 35}}> Manage Cabinet Activities </h2></b>
            </ol>
        </nav>

        <div className="row">
            <div className="col-md-5">
                <ActCabinet_Form {...({addOrEdit,currentId,cabinetObjects,disabled})}/>
            </div>
            <div className="col-md-7">

                <input type="text" 
                style={{display: "block", "width": "100%", "padding" : "7px", marginBottom : 10}} 
                placeholder="Search by user"
                onChange={handleChange}/>

                <table className="table table-borderless table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th> Activity ID </th>
                            <th> Added by </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(cabinetObjects).map(id =>{
                                return <tr key={id}>
                                    <td>{cabinetObjects[id].activity_no}</td>
                                    <td>{cabinetObjects[id].addedbyUser.map((username, index) =>
                                        <p style={{margin:0}} key={index}>{username}</p>)
                                    }</td>
                                    <td>
                                    {/* <a style={{marginRight: 20}} className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a> */}
                                        <a style={{marginRight: 20}} className="btn btn-primary" onClick={ function(event){ setCurrentId(id); setDisabled(false)} }>Edit</a>
                                        {/* function(event){ func1(); func2()} */}
                                        <a className="btn btn-danger"  onClick={()=> {onDelete(cabinetObjects[id].id, cabinetObjects[id].activity_no)}}>Delete</a>
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

export default ActCabinet;