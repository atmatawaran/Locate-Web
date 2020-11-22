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
            props.facilities.map((facility) => {
                if(facility.fac_id === props.currentId){
                    setValues({
                        ...facility
                    })
                }
            })
        }
        
    },[props.currentId,props.facilities]);
    

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
        <form autoComplete="off" onSubmit={handleFormSubmit} style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}> 

            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            ID
                        </div>
                    </div>
                    <input class="form-control" name="fac_id" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_id}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Type
                        </div>
                    </div>
                    <input class="form-control"name="fac_type" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_type}
                    onChange={handleInputChange}/>
                </div>
            </div>


                <div class="form-group">
                    <label for="inputAddress">Facility Info</label>
                    <textarea class="form-control" rows="2" name="fac_info" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_info}
                    onChange={handleInputChange}></textarea>
                </div>

                <div class="form-group">
                    <label for="inputAddress">Facility Addresss</label>
                    <textarea class="form-control" rows="2"  name="fac_address" disabled = {(props.disabled)? "disabled" : ""} value={values.fac_address}
                    onChange={handleInputChange}></textarea>
                </div>
        
                <input type="submit" value="Update" className="btn btn-primary btn-block"/> 


        </form> //FORM

    );
}

export default FacilityForm;