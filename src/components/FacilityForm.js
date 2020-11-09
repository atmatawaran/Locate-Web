import React, {useState, useEffect} from "react";

const FacilityForm = (props) => {
    const initialFieldValues = {
        fac_id: "",
        fac_type: "",
        fac_info: "",
        fac_address: "",
        fac_dateAdded: null,
        fac_gps: null,
        fac_addedBy: ""
    }

    var[values,setValues] = useState(initialFieldValues);

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values);
        console.log(values);
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Facility Name" 
                    name="fac_id" value={values.fac_id}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Facility Type" 
                    name="fac_type" value={values.fac_type}
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
                    name="fac_info" value={values.fac_info}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Facility Address" 
                    name="fac_address" value={values.fac_address}
                    onChange={handleInputChange}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Added by" 
                    name="fac_addedBy" value={values.fac_addedBy}
                    onChange={handleInputChange}/>
                </div>
                
                <div className="form-control">
                        <input type="submit" value="Save" className="btn btn-primary btn-block"/> 
                </div>


        </form> //FORM

    );
}

export default FacilityForm;