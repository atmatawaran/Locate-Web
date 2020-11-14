import React, {useState, useEffect} from "react";

const FacilityForm = (props) => {
    const initialFieldValues = {
        fac_id: "", // fac_name
        fac_type: "",
        fac_info: "",
        fac_address: "",
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
                ...props.facilityObjects[props.currentId]
            })
        }
        
    },[props.currentId,props.facilityObjects]);
    

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

        if(props.disabled === true){
            alert("Choose a facility first to edit!");
        }
        else{
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
                props.addOrEdit(values); // pass values to 
                console.log(values);
            }
        }
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit} style={{marginLeft: 50, marginRight: 20}}> 
            
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Facility Name" 
                    name="fac_id" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_id}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Facility Type" 
                    name="fac_type" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_type}
                    onChange={handleInputChange}/>
                </div>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Facility Info" 
                    name="fac_info" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_info}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Facility Address" 
                    name="fac_address" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_address}
                    onChange={handleInputChange}/>
                </div>
        
                <input type="submit" value="Update" className="btn btn-primary btn-block"/> 


        </form> //FORM

    );
}

export default FacilityForm;