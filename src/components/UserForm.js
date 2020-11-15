import React, {useState, useEffect} from "react";

const UserForm = (props) => {
    const initialFieldValues = {
        user_username: "",
        user_email: "",
        user_password: "",
    }

    var[values,setValues] = useState(initialFieldValues);

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
        e.preventDefault();
        props.addOrEdit(values); // pass values to 
        console.log(values);
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit} style={{marginLeft: 50, marginRight: 20}}>
            
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                    <span class="input-group-text">@</span>
                    </div>
                    <input className="form-control" placeholder="User Name" 
                    name="user_username" value={values.user_username}
                    onChange={handleInputChange} required/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="User Email" 
                    name="user_email" value={values.user_email}
                    onChange={handleInputChange} required/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="User Password" 
                    name="user_password" value={values.user_password}
                    onChange={handleInputChange} required/>
                </div>
                </div>

                
                        <input type="submit" value={props.currentId==""?"Save":"Update"} className="btn btn-primary btn-block"/> 


        </form> //FORM

    );
}

export default UserForm;