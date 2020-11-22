import React, {useState, useEffect, useCallback, useRef} from "react";
import cab_marker from "../cab_marker.svg";
import location_pin from "../location-pin.svg";
import cable_marker from "../cable_marker.svg";
import dp_marker from "../dp_marker.svg";
import mh_marker from "../mh_marker.svg";
import pole_marker from "../pole_marker.svg";

import trash from "../trash.svg";
import edit from "../edit.svg";

import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

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
    const [markers, setMarkers] = useState([]);
    const [cable,setCable] = useState([]);
    const [selected, setSelected] = useState(null);

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
                <table className="table table-borderless table-stripped">
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
                              <a style={{marginRight: 20}} className="btn btn-primary"><img class="tableicon" src={edit}></img></a>
                              <a className="btn btn-danger"  onClick={()=> {onDelete(facilityObjects[id].id)}}><img class="tableicon" src={trash}></img></a>
                            </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}