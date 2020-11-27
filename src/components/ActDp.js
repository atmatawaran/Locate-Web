import React, {useState, useEffect} from "react";
import ActDp_Form from "./ActDp_Form";
import { db, auth } from "./firebase";

const ActDp = () => {

    var [dpObjects,setDpObjects] = useState({});
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);

    // similar to componentDidMount
    useEffect(() =>{
        db.collection("activities_dp").onSnapshot(function(data){
            console.log(data);
            setDpObjects(data.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            })))
        })
    },[])


    const addOrEdit = obj => {
        if(currentId == ''){
            db.collection('activities_dp').add(obj).then(function() {
                console.log(currentId)
                console.log("Document successfully added!");
                setCurrentId('')
            });
            console.log("added")
        }
        else{
            db.collection('activities_dp').doc(dpObjects[currentId].id)
            .update({
                dp_main_cable: obj.dp_main_cable,
                dp_sub_cable: obj.dp_sub_cable,

                dp_proper: obj.dp_proper,
                dp_standard: obj.dp_standard,

                dp_intact: obj.dp_intact,
                dp_lock: obj.dp_lock,

                dp_bridle: obj.dp_bridle,
                dp_splice: obj.dp_splice,

                dp_rubber: obj.dp_rubber,
                dp_infest: obj.dp_infest,

                dp_tagging: obj.dp_tagging,
                dp_lcp_install: obj.dp_lcp_install,

                dp_inside: obj.dp_inside,
                dp_box: obj.dp_box,

                dp_remarks: obj.dp_remarks,
                dp_find_recc: obj.dp_find_recc
            
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

            db.collection('activities_dp').doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            });
        }
    }

    return(
    <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <b><h2 style={{marginLeft: 35}}> Manage DP/LCP/NAP Activities </h2></b>
            </ol>
        </nav>

        <div className="row">
            <div className="col-md-5">
                <ActDp_Form {...({addOrEdit,currentId,dpObjects,disabled})}/>
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
                            Object.keys(dpObjects).map(id =>{
                                return <tr key={id}>
                                    <td>{dpObjects[id].activity_no}</td>
                                    <td>{dpObjects[id].activity_type}</td>
                                    <td>
                                    {/* <a style={{marginRight: 20}} className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a> */}
                                        <a style={{marginRight: 20}} className="btn btn-primary" onClick={ function(event){ setCurrentId(id); setDisabled(false)} }>Edit</a>
                                        {/* function(event){ func1(); func2()} */}
                                        <a className="btn btn-danger"  onClick={()=> {onDelete(dpObjects[id].id, dpObjects[id].activity_no)}}>Delete</a>
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

export default ActDp;