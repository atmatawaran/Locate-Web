import React, {useState, useEffect} from "react";

const ActCabinet_Form = (props) => {
    const initialFieldValues = {
        activity_no: "",
        activity_type: "",
        cab_door: "",
        cab_terminal: "",
        cab_jumper: "",
        cab_lock: "",
        cab_port: "",
        cab_ground: "",
        cab_ovoc: "",
        cab_remarks: "",
        cab_find_recc: ""
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
                ...props.cabinetObjects[props.currentId]
            })
        }
        
    },[props.currentId,props.cabinetObjects]);
    

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
                            Cabinet Door
                        </div>
                    </div>
                    <input className="form-control"
                    name="cab_door" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_door}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Terminal Strips
                        </div>
                    </div>
                    <input className="form-control"
                    name="cab_terminal" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_terminal}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Jumper Writing
                        </div>
                    </div>
                    <input className="form-control"
                    name="cab_jumper" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_jumper}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Locking Mechanism Good?
                        </div>
                    </div>
                    <input className="form-control"
                    name="cab_lock" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_lock}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Port Holes with Sealing?
                        </div>
                    </div>
                    <input className="form-control"
                    name="cab_port" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_port}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Grounding Cables Installed?
                        </div>
                    </div>
                    <input className="form-control"
                    name="cab_ground" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_ground}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            One Voice Operations Center
                        </div>
                    </div>
                    <input className="form-control"
                    name="cab_ovoc" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_ovoc}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Remarks
                        </div>
                    </div>
                    <textarea class="form-control" rows="3" name="cable_remarks" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_remarks}
                    onChange={handleInputChange}></textarea>
                </div>
                

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            Findings
                        </div>
                    </div>
                    <textarea class="form-control" rows="3" name="cable_find_recc" disabled = {(props.disabled)? "disabled" : ""} value={values.cab_find_recc}
                    onChange={handleInputChange}></textarea>
                </div>

                
                <input type="submit" value="Update" className="btn btn-primary btn-block"/> 
            


        </form> //FORM

    );
}

export default ActCabinet_Form;