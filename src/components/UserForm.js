import React, {useState, useEffect} from "react";

const UserForm = (props) => {
    const initialFieldValues = {
        user_first_name:"",
        user_last_name:"",
        user_username: "",
        user_email: "",
        user_password: "",
        icon: null
    }

    var[values,setValues] = useState(initialFieldValues);
    var[origPassword,setOrigPassword] = useState();
    var[origEmail,setEmail] = useState();

    // edit or delete
    useEffect(()=>{
        if(props.currentId==''){
            setValues({
                ...initialFieldValues
            })
        }
        else{
            // populating the form fields
            setValues({
                ...props.userObjects[props.currentId]
            })
            setOrigPassword(props.userObjects[props.currentId].user_password);
            setEmail(props.userObjects[props.currentId].user_email);
        }
        
    },[props.currentId,props.userObjects]);

    // when the form is changed
    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleFormSubmit = e => {
        var flag = 0;
            // checks if there is an empty field in the form
            for (let k in values) {
                if (values[k] === "") {
                    alert("Complete your info!");
                    flag = 1;
                    break;
                }
            }

            if(flag === 0){ //if all the fields have values
                e.preventDefault();
                props.addOrEdit(values, origPassword, origEmail); // pass values to 
                console.log(values);
            }
    }

    return (

        <form autoComplete="off" onSubmit={handleFormSubmit} style={{marginLeft: 50, marginRight: 20}}> 

            <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Username</label>
                        <input className="form-control" 
                    name="user_username" disabled = {(props.disabled)? "" : "disabled"} value={values.user_username}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Password</label>
                        <input className="form-control" 
                    name="user_password" value={values.user_password} onChange={handleInputChange}/>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Must be 8-20 characters long.
                        </small>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>First Name</label>
                        <input className="form-control"
                    name="user_first_name" value={values.user_first_name}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Last Name</label>
                        <input className="form-control"
                    name="user_last_name" value={values.user_last_name}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputAddress">Email</label>
                    <input className="form-control"
                    name="user_email" value={values.user_email}
                    onChange={handleInputChange}/>
                </div>



                <input type="submit" value={props.currentId==""?"Add":"Update"} className="btn btn-primary btn-block"/> 
            


        </form> //FORM


    );
}

export default UserForm;