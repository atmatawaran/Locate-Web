import React, {useState, useEffect} from "react";

const ActPole_Form = (props) => {
    const initialFieldValues = {
        activity_no: "",
        activity_type: "",
        pole_owner: "",
        pole_type: "",
        pole_struct: "",
        pole_vertical_align: "",
        pole_guying: "",
        pole_secured: "",
        pole_primary: "",
        pole_secondary: "",
        pole_vertical_clear: "",
        pole_proper: "",
        pole_3rd: "",
        pole_remarks: "",
        pole_find_recc: ""
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
                ...props.poleObjects[props.currentId]
            })
        }
        
    },[props.currentId,props.poleObjects]);
    

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
            alert("Choose an activity first to edit!");
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
                            ID
                        </div>
                    </div>
                    <input className="form-control" 
                    name="activity_no" disabled = "true" value={values.activity_no}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Type
                        </div>
                    </div>
                    <input className="form-control" 
                    name="activity_type" disabled = "true" value={values.activity_type}
                    onChange={handleInputChange}/>
                </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Owner</label>
                        <input className="form-control"
                    name="pole_owner" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_owner}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Pole Type</label>
                        <input className="form-control"
                    name="pole_type" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_type}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Structure Integrity</label>
                        <input className="form-control"
                    name="pole_struct" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_struct}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Vertical Alignment (90-180)</label>
                        <input className="form-control"
                    name="pole_vertical_align" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_vertical_align}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>With Guying</label>
                        <input className="form-control"
                    name="pole_guying" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_guying}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Secured and Properly Grounded</label>
                        <input className="form-control"
                    name="pole_secured" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_secured}
                    onChange={handleInputChange}/>
                    </div>
                </div>



                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>(Right of Way) Primary Road</label>
                        <input className="form-control"
                    name="pole_primary" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_primary}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>(Right of Way) Secondary Road</label>
                        <input className="form-control"
                    name="pole_secondary" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_secondary}
                    onChange={handleInputChange}/>
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Vertical Clearance is 18ft</label>
                        <input className="form-control"
                    name="pole_vertical_clear" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_vertical_clear}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Proper Attachment (Ally/Extension)</label>
                        <input className="form-control"
                    name="pole_proper" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_proper}
                    onChange={handleInputChange}/>
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>With 3rd Party Attachment</label>
                        <input className="form-control"
                    name="pole_3rd" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_3rd}
                    onChange={handleInputChange}/>
                    </div>
                </div>



                <div class="form-group">
                    <label for="inputAddress">Remarks</label>
                    <textarea class="form-control" rows="1" name="pole_remarks" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_remarks}
                    onChange={handleInputChange}></textarea>
                </div>

                <div class="form-group">
                    <label for="inputAddress">Findings and Recommendation</label>
                    <textarea class="form-control" rows="1" name="pole_find_recc" disabled = {(props.disabled)? "disabled" : ""} value={values.pole_find_recc}
                    onChange={handleInputChange}></textarea>
                </div>

                
                <input type="submit" value="Update" className="btn btn-primary btn-block"/> 

    
        </form> 


    );
}

export default ActPole_Form;