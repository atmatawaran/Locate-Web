import React, {useState, useEffect} from "react";

const ActCable_Form = (props) => {
    const initialFieldValues = {
        activity_no: "",
        activity_type: "",
        cable_owner: "",
        cable_cond: "",
        cable_clear_obst: "",
        cable_low_sag: "",
        cable_exposed: "",
        cable_remarks: "",
        cable_find_recc: ""
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
                ...props.cableObjects[props.currentId]
            })
        }
        
    },[props.currentId,props.cableObjects]);
    

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

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Cable Owner
                        </div>
                    </div>
                    <input className="form-control"
                    name="cable_owner" disabled = {(props.disabled)? "disabled" : ""} value={values.cable_owner}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Cable Condition
                        </div>
                    </div>
                    <input className="form-control"
                    name="cable_cond" disabled = {(props.disabled)? "disabled" : ""} value={values.cable_cond}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Cable Clear Obstruction
                        </div>
                    </div>
                    <input className="form-control"
                    name="cable_clear_obst" disabled = {(props.disabled)? "disabled" : ""} value={values.cable_clear_obst}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Cable Low Sagged
                        </div>
                    </div>
                    <input className="form-control"
                    name="cable_low_sag" disabled = {(props.disabled)? "disabled" : ""} value={values.cable_low_sag}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Cable Exposed
                        </div>
                    </div>
                    <input className="form-control"
                    name="cable_exposed" disabled = {(props.disabled)? "disabled" : ""} value={values.cable_exposed}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Remarks
                        </div>
                    </div>
                    <textarea class="form-control" rows="3" name="cable_remarks" disabled = {(props.disabled)? "disabled" : ""} value={values.cable_remarks}
                    onChange={handleInputChange}></textarea>
                </div>
                

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Findings
                        </div>
                    </div>
                    <textarea class="form-control" rows="3" name="cable_find_recc" disabled = {(props.disabled)? "disabled" : ""} value={values.cable_find_recc}
                    onChange={handleInputChange}></textarea>
                </div>

                
                <input type="submit" value="Update" className="btn btn-primary btn-block"/> 
            


        </form> //FORM

    );
}

export default ActCable_Form;