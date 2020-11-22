import React, {useState, useEffect, useCallback, useRef} from "react";
import cab_marker from "../cab_marker.svg";
import location_pin from "../location-pin.svg";
import cable_marker from "../cable_marker.svg";
import dp_marker from "../dp_marker.svg";
import mh_marker from "../mh_marker.svg";
import pole_marker from "../pole_marker.svg";

import FacilityForm from "./FacilityForm.js";

import trash from "../trash.svg";
import edit from "../edit.svg";

import { Button, Dropdown, DropdownButton, ButtonGroup, Modal, Table} from 'react-bootstrap';

import './Map.css'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import { db, auth } from "./firebase";

const libraries = ["places"];
const mapContainerStyle = {
    width: '68vw',
    height: '100vh'
}

const center = {
    lat: 14.522820, 
    lng: 121.269638
}

const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

export default function Map(){

    const [facilities,setFacilities] = useState([]);
    var [facilityObjects,setFacilityObjects] = useState({}); // for table
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);

    useEffect(() =>{
        db.collection("facilities").onSnapshot(function(data){
            console.log(data);
            setFacilities(data.docs.map(doc => ({
                ...doc.data(),
            })))
        })
    },[])

    useEffect(() =>{
      db.collection("facilities").onSnapshot(function(data){
          console.log(data);
          setFacilityObjects(data.docs.map(doc => ({
              ...doc.data(),
              id:doc.id
          })))
      })
  },[])

  const onDelete = id =>{
    if(window.confirm("Delete this document?")){
        db.collection('facilities').doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        });
    }
  }

  const addOrEdit = obj => {
    if(currentId == ''){
        db.collection('facilities').add(obj).then(function() {
            console.log(currentId)
            console.log("Document successfully added!");
            setCurrentId('')
        });
        console.log("added")
    }
    else{
        db.collection('facilities').doc(facilityObjects[currentId].id)
        .update({
            fac_id: obj.fac_id,
            fac_type: obj.fac_type,
            fac_info: obj.fac_info,
            fac_address: obj.fac_address
        
        })
        .then(function() {
            console.log("Document successfully updated!");
            setCurrentId('')
        });

    }
}

    // Object.keys(facilities).map(id =>{
    //     console.log(facilities[id].fac_id)
    // })

    const onLoad = marker => {
        console.log('marker: ', marker.position)
    }

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if(loadError) return "Error loading maps";
    if(!isLoaded){
        console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
        return "Loading maps";
    }

    return (
    <div>
        <div className="row">
            {/* 1st column */}
            <div className="col-md-8">
              <GoogleMap 
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={center}
                    options={options}
                    onLoad={onMapLoad}>

                <div class="dropdown">
                <DropdownButton id="dropdown-item-button" title="Filter Markers">
                  <Dropdown.Item as="button">Show All</Dropdown.Item>
                  <Dropdown.Item as="button">Show Cabinet only</Dropdown.Item>
                  <Dropdown.Item as="button">Show Cable only</Dropdown.Item>
                  <Dropdown.Item as="button">Show DP/LCP/NAP only</Dropdown.Item>
                  <Dropdown.Item as="button">Show Manhole only</Dropdown.Item>
                  <Dropdown.Item as="button">Show Pole only</Dropdown.Item>
                </DropdownButton>
                  </div>

                {facilities.map((facility) => (
                  <Marker
                    key={facility.fac_id}
                    position={new window.google.maps.LatLng(parseFloat(facility.fac_gps.latitude),parseFloat(facility.fac_gps.longitude))}
                    onLoad={onLoad}
                    icon={{
                      url: facility.fac_type === "Cabinet" ? cab_marker: 
                            facility.fac_type === "Cable" ? cable_marker: 
                            facility.fac_type === "DP/LCP/NAP" ? dp_marker: 
                            facility.fac_type === "Manhole" ? mh_marker: pole_marker,
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(25, 25),
                      scaledSize: new window.google.maps.Size(50, 50),
                    }}
                    onClick={() => setSelected(facility)}
                  />
                ))}

                {selected ? (<InfoWindow position={new window.google.maps.LatLng(parseFloat(selected.fac_gps.latitude),parseFloat(selected.fac_gps.longitude))}
                            onCloseClick={() => {
                              setSelected(null);
                            }}>
                  <div>
                    <h6> {selected.fac_id} </h6>
                    <p> <img class="location" src={location_pin}></img> {selected.fac_address} </p>
                    <p> {selected.fac_info} </p>
                  </div>
                </InfoWindow>): null}
              </GoogleMap>
            </div> 

            {/* 2nd column */}
            <div className="col-md-4 tableinfo"> 
              <Table striped bordered hover size="sm">
                    <thead className="thead-light">
                        <tr>
                            <th> Facility Name </th>
                            <th> Facility Type </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      Object.keys(facilityObjects).map(id =>{
                        return <tr key={id}>
                          <td>{facilityObjects[id].fac_id}</td>
                          <td>{facilityObjects[id].fac_type}</td>
                          <td>
                              <a className="btn btn-primary" style={{marginRight: 10}} onClick={ function(event){ setCurrentId(id); setDisabled(false); setShow(true)} }><img class="tableicon" src={edit}></img></a>
                              <a className="btn btn-danger"  onClick={()=> {onDelete(facilityObjects[id].id)}}><img class="tableicon" src={trash}></img></a>
                            </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
                      
            <Modal show={show}>
              <Modal.Header> <h3> Edit Facility </h3> <Button variant="secondary" onClick={() => setShow(false)}> Close </Button> </Modal.Header>
              <Modal.Body> <FacilityForm {...({addOrEdit,currentId,facilityObjects,disabled})}/> </Modal.Body>
            </Modal>

        </div>
    </div>
    );
}