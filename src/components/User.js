import React, {useState, useEffect} from "react";
import UserForm from "./UserForm";
import { db, auth } from "./firebase";

const User = () => {

    var [userObjects,setUserObjects] = useState({});
    var [currentId, setCurrentId] = useState('');

    // similar to componentDidMount
    useEffect(() =>{
        db.collection("users").onSnapshot(function(data){
            console.log(data);
            setUserObjects(data.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            })))
        })
    },[])


    const addOrEdit = obj => {
        if(currentId == ''){
            db.collection('users').add(obj).then(function() {
                console.log(currentId)
                console.log("Document successfully added!");
                setCurrentId('')
            });
            console.log("added")
        }
        else{
            db.collection('users').doc(userObjects[currentId].id).set(obj).then(function() {
                console.log("Document successfully updated!");
                setCurrentId('')
            });
        }
    }

    const onDelete = id =>{
        if(window.confirm("Delete this document?")){
            db.collection('users').doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            });
        }
    }

    return(
    <>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4" text-center>Add User</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <UserForm {...({addOrEdit,currentId,userObjects})}/>
            </div>
            <div className="col-md-7">
                <table className="table table-borderless table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th> Username </th>
                            <th> User Email </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(userObjects).map(id =>{
                                return <tr key={id}>
                                    <td>{userObjects[id].user_username}</td>
                                    <td>{userObjects[id].user_email}</td>
                                    <td>
                                        <a className="btn btn-primary" onClick={()=> {setCurrentId(id)}}>Edit</a>&nbsp;
                                        <a className="btn btn-danger"  onClick={()=> {onDelete(userObjects[id].id)}}>Delete</a>
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

export default User;