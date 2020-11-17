import React, {useState, useEffect} from "react";

const ActManhole_Form = (props) => {
    const initialFieldValues = {
        activity_no: "",
        activity_type: "",
        mh_cover: "",
        mh_row: "",
        mh_lock: "",
        mh_remarks: "",
        mh_find_recc: ""
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
                ...props.manholeObjects[props.currentId]
            })
        }
        
    },[props.currentId,props.manholeObjects]);
    

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
                        <label>Manhole Cover Condition</label>
                        <input className="form-control"
                    name="mh_cover" disabled = {(props.disabled)? "disabled" : ""} value={values.mh_cover}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Right of Way (side of the street)</label>
                        <input className="form-control"
                    name="mh_row" disabled = {(props.disabled)? "disabled" : ""} value={values.mh_row}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Manhole Cover Lock</label>
                        <input className="form-control"
                    name="mh_lock" disabled = {(props.disabled)? "disabled" : ""} value={values.mh_lock}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputAddress">Remarks</label>
                    <textarea class="form-control" rows="1" name="mh_remarks" disabled = {(props.disabled)? "disabled" : ""} value={values.mh_remarks}
                    onChange={handleInputChange}></textarea>
                </div>

                <div class="form-group">
                    <label for="inputAddress">Findings and Recommendation</label>
                    <textarea class="form-control" rows="1" name="mh_find_recc" disabled = {(props.disabled)? "disabled" : ""} value={values.mh_find_recc}
                    onChange={handleInputChange}></textarea>
                </div>
                
                <input type="submit" value="Update" className="btn btn-primary btn-block"/> 
            


        </form> //FORM

    );
}

export default ActManhole_Form;