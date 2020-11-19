import React, {useState, useEffect} from "react";
import UserForm from "./UserForm";
import { db, auth } from "./firebase";

const User = (props) => {

    var [userObjects,setUserObjects] = useState({});
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);

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


    const addOrEdit = (obj,origPassword, origEmail) => {
        if(currentId == ''){

            db.collection('users')
            .add({
                user_first_name: obj.user_first_name,
                user_last_name: obj.user_last_name,
                user_username: obj.user_username,
                user_email: obj.user_email,
                user_password: obj.user_password,
                icon: null

            }).then(function() {
                console.log(obj.user_email);
                console.log("Document successfully added!");
                setCurrentId('')
            });

            auth.createUserWithEmailAndPassword(obj.user_email, obj.user_password)
                .then((user) => {
                    alert("User successfully created!");
                    console.log("User successfully created!");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });

        }
        else{

            auth.signInWithEmailAndPassword(origEmail, origPassword)
                    .then((userCredential) => {

                        userCredential.user.updateEmail(obj.user_email).then(function() {
                            console.log("Email successfully updated to: " + obj.user_email);
                          }).catch(function(error) {
                            console.log("Update error: email");
                          });

                          userCredential.user.updatePassword(obj.user_password).then(function() {
                            console.log("Password successfully updated to: " + obj.user_password);
                          }).catch(function(error) {
                            console.log("Update error: password");
                          });

                          db.collection('users').doc(userObjects[currentId].id)
                            .update({
                                user_first_name: obj.user_first_name,
                                user_last_name: obj.user_last_name,
                                user_username: obj.user_username,
                                user_email: obj.user_email,
                                user_password: obj.user_password,
                            })
                            .then(function() {
                                alert("User info successfully updated!");
                                setCurrentId('')
                            });

                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        
                        console.log("ERROR " + errorMessage);
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
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <b><h2> Manage Users </h2></b>
            </ol>
        </nav>

        <div className="row">
            <div className="col-md-5">
                <UserForm {...({addOrEdit,currentId,userObjects,disabled})}/>
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
                                    <a style={{marginRight: 20}} className="btn btn-primary" onClick={ function(event){ setCurrentId(id); setDisabled(false)} }>Edit</a>
                                        {/* <a className="btn btn-danger"  onClick={()=> {onDelete(userObjects[id].id)}}>Delete</a> */}
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