import React, {useState, useEffect} from "react";
import ActPole_Form from "./ActPole_Form";
import { db, auth } from "./firebase";

const ActPole = () => {

    var [poleObjects,setPoleObjects] = useState({});
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);
    var [input, setInput] = useState("");

    // similar to componentDidMount
    useEffect(() =>{
        db.collection("activities_pole").onSnapshot(function(data){
            console.log(data);
            setPoleObjects(data.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            })))
        })
    },[])


    const addOrEdit = obj => {
        if(currentId == ''){
            db.collection('activities_pole').add(obj).then(function() {
                console.log(currentId)
                console.log("Document successfully added!");
                setCurrentId('')
            });
            console.log("added")
        }
        else{
            db.collection('activities_pole').doc(poleObjects[currentId].id)
            .update({
                pole_owner: obj.pole_owner,
                pole_type: obj.pole_type,
                pole_struct: obj.pole_struct,
                pole_vertical_align: obj.pole_vertical_align,
                pole_guying: obj.pole_guying,
                pole_secured: obj.pole_secured,
                pole_primary: obj.pole_primary,
                pole_secondary: obj.pole_secondary,
                pole_vertical_clear: obj.pole_vertical_clear,
                pole_proper: obj.pole_proper,
                pole_3rd: obj.pole_3rd,
                pole_remarks: obj.pole_remarks,
                pole_find_recc: obj.pole_find_recc
            
            })
            .then(function() {
                alert("Document successfully updated!");
                setCurrentId('')
                setDisabled(true);
            });

        }
    }

    const onDelete = (id, act_no) =>{
        if(window.confirm("Delete this document?")){

            db.collection('activities') .where('activity_no', '==', act_no).get().then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });

            db.collection('activities_pole').doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            });

            console.log("hey" + act_no);
        }
    
    }

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    if(input.length > 0) {
        poleObjects = poleObjects.filter((i) => {
            return i.addedbyUser.join().includes(input)
        })
    }

    return(
    <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <b><h2 style={{marginLeft: 35}}> Manage Pole Activities </h2></b>
            </ol>
        </nav>

        <div className="row">
            <div className="col-md-5">
                <ActPole_Form {...({addOrEdit,currentId,poleObjects,disabled})}/>
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
                            Object.keys(poleObjects).map(id =>{
                                return <tr key={id}>
                                    <td>{poleObjects[id].activity_no}</td>
                                    <td>{poleObjects[id].addedbyUser.map((username, index) =>
                                        <p style={{margin:0}} key={index}>{username}</p>)
                                    }</td>
                                    <td>
                                    {/* <a style={{marginRight: 20}} className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a> */}
                                        <a style={{marginRight: 20}} className="btn btn-primary" onClick={ function(event){ setCurrentId(id); setDisabled(false)} }>Edit</a>
                                        {/* function(event){ func1(); func2()} */}
                                        <a className="btn btn-danger"  onClick={()=> {onDelete(poleObjects[id].id, poleObjects[id].activity_no)}}>Delete</a>
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

export default ActPole;