import React, {useState, useEffect} from "react";

const ActDp_Form = (props) => {
    const initialFieldValues = {
        activity_no: "",
        activity_type: "",

        dp_main_cable: "",
        dp_sub_cable: "",

        dp_proper: "",
        dp_standard: "",

        dp_intact: "",
        dp_lock: "",

        dp_bridle: "",
        dp_splice: "",

        dp_rubber: "",
        dp_infest: "",

        dp_tagging: "",
        dp_lcp_install: "",

        dp_inside: "",
        dp_box: "",

        dp_remarks: "",
        dp_find_recc: ""
        
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
                ...props.dpObjects[props.currentId]
            })
        }
        
    },[props.currentId,props.dpObjects]);
    

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
                        <label>Main cable Installation</label>
                        <input className="form-control"
                    name="dp_main_cable" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_main_cable}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Subscriber Cable Installation</label>
                        <input className="form-control"
                    name="dp_sub_cable" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_sub_cable}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Proper Attachment to Pole</label>
                        <input className="form-control"
                    name="dp_proper" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_proper}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>With Standard Stencil</label>
                        <input className="form-control"
                    name="dp_standard" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_standard}
                    onChange={handleInputChange}/>
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>With Intact Cover</label>
                        <input className="form-control"
                    name="dp_intact" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_intact}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Locking Mechanism Good</label>
                        <input className="form-control"
                    name="dp_lock" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_lock}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>With Six Bridle Rings</label>
                        <input className="form-control"
                    name="dp_bridle" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_bridle}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Splice Tray Intact</label>
                        <input className="form-control"
                    name="dp_splice" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_splice}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>With Rubber Grommet</label>
                        <input className="form-control"
                    name="dp_rubber" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_rubber}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>With Infestation</label>
                        <input className="form-control"
                    name="dp_infest" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_infest}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Subscriner Drop Cable Tag</label>
                        <input className="form-control"
                    name="dp_tagging" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_tagging}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>LCP/NAP not installed</label>
                        <input className="form-control"
                    name="dp_lcp_install" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_lcp_install}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Inside Box Wiring Status</label>
                        <input className="form-control"
                    name="dp_inside" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_inside}
                    onChange={handleInputChange}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Box Condition</label>
                        <input className="form-control"
                    name="dp_box" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_box}
                    onChange={handleInputChange}/>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputAddress">Remarks</label>
                    <textarea class="form-control" rows="1" name="dp_remarks" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_remarks}
                    onChange={handleInputChange}></textarea>
                </div>

                <div class="form-group">
                    <label for="inputAddress">Findings and Recommendation</label>
                    <textarea class="form-control" rows="1" name="dp_find_recc" disabled = {(props.disabled)? "disabled" : ""} value={values.dp_find_recc}
                    onChange={handleInputChange}></textarea>
                </div>
                
                <input type="submit" value="Update" className="btn btn-primary btn-block"/> 
            


        </form> //FORM

    );
}

export default ActDp_Form;