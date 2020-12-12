import React, {useState, useEffect, useCallback, useRef} from "react";
import cab_marker from "../cab_marker.svg";
import location_pin from "../location-pin.svg";
import cable_marker from "../cable_marker.svg";
import dp_marker from "../dp_marker.svg";
import mh_marker from "../mh_marker.svg";
import pole_marker from "../pole_marker.svg";

import compass from "../compass.svg";

import FacilityForm from "./FacilityForm.js";

import trash from "../trash.svg";
import edit from "../edit.svg";

import { Button, Dropdown, DropdownButton, ButtonGroup, Card, Modal, ListGroup, Table} from 'react-bootstrap';

import './Map.css'

import {
    GoogleMap, useLoadScript, Marker, InfoWindow
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,getLatLng,
} from "use-places-autocomplete";

import {
  Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css"

import { formatRelative } from "date-fns";
import { db, auth } from "./firebase";

const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
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
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);
    var [currentId, setCurrentId] = useState('');
    var [disabled, setDisabled] = useState(true);

    var [cableCount, setCableCount] = useState(0);
    var [cabCount, setCabCount] = useState(0);
    var [dpCount, setDpCount] = useState(0);
    var [mhCount, setMhCount] = useState(0);
    var [poleCount, setPoleCount] = useState(0);

    useEffect(() =>{
        db.collection("facilities").onSnapshot(function(data){
            console.log(data);
            setFacilities(data.docs.map(doc => ({
                ...doc.data(),
                id:doc.id
            })))
        })
    },[])

    // facilities.map((facility) => (

    function getCount(){
      var cable_count = 0, cab_count = 0, dp_count = 0, mh_count = 0, pole_count = 0;

      facilities.map((facility) => {

        switch(facility.fac_type){
          case "Cable": cable_count++; break;
          case "Cabinet": cab_count++; break;
          case "DP/LCP/NAP": dp_count++; break;
          case "Manhole": mh_count++; break;
          case "Pole": pole_count++; break;
        }
      })
      setCableCount(cable_count);
      setCabCount(cab_count);
      setDpCount(dp_count);
      setMhCount(mh_count);
      setPoleCount(pole_count);
    }

  const onDelete = id =>{
    if(window.confirm("Are you sure you want to delete this facility?")){
        db.collection('facilities').doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            alert("Facility successfully deleted!");
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
        db.collection('facilities').doc(selected.id)
        .update({
            fac_id: obj.fac_id,
            fac_type: obj.fac_type,
            fac_info: obj.fac_info,
            fac_address: obj.fac_address
        
        })
        .then(function() {
            console.log("Document successfully updated!");
            alert("Facility successfully updated!");
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

    const panTo = React.useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(14);
    }, []); // no depth

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

      <Search panTo={panTo}/>
      <Locate panTo={panTo}/>


        <div className="row">
            {/* 1st column */}
            <div className="col-md-8">
              <GoogleMap 
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={center}
                    options={options}
                    onLoad={onMapLoad}>

          {/* <Card style={{ width: '15rem' }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Facilities Count</ListGroup.Item>
                  <ListGroup.Item>Cable</ListGroup.Item>
                  <ListGroup.Item>Cabinet</ListGroup.Item>
                  <ListGroup.Item>DP/LCP/NAP</ListGroup.Item>
                  <ListGroup.Item>Manhole</ListGroup.Item>
                  <ListGroup.Item>Pole</ListGroup.Item>
                </ListGroup>
              </Card> */}

                <div class="dropdown">
                <DropdownButton onClick={getCount} id="dropdown-item-button" title="Facility Count">

                  <Dropdown.Item>Cable: {cableCount}</Dropdown.Item>
                  <Dropdown.Item>Cabinet: {cabCount}</Dropdown.Item>
                  <Dropdown.Item>DP/LCP/NAP: {dpCount}</Dropdown.Item>
                  <Dropdown.Item>Manhole: {mhCount}</Dropdown.Item>
                  <Dropdown.Item>Pole: {poleCount}</Dropdown.Item>
                  <Dropdown.Item><b>Total Count: {Object.keys(facilities).length}</b></Dropdown.Item>
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
                    <h5> {selected.fac_id} </h5>
                    <p> <img class="location" src={location_pin}></img> {selected.fac_address} </p>
                    <p> {selected.fac_info} </p>
                    <a className="btn btn-primary btnoptions" style={{marginRight: 10}} onClick={ function(event){ setCurrentId(selected.fac_id); setDisabled(false); setShow(true)} }><img class="tableicon" src={edit}></img></a>
                    <a className="btn btn-danger btnoptions"  onClick={()=> {onDelete(selected.id)}}><img class="tableicon" src={trash}></img></a>
                  </div>
                </InfoWindow>): null}
              </GoogleMap>
            </div> 
                      
            <Modal style={{marginTop:110}} show={show}>
              <Modal.Header> <h3> Edit Facility </h3> <Button variant="secondary" onClick={() => setShow(false)}> Close </Button> </Modal.Header>
              <Modal.Body> <FacilityForm {...({addOrEdit,currentId,facilities,disabled})}/> </Modal.Body>
            </Modal>

        </div>
    </div>
    );
}

function Locate({ panTo }){
  return (
  <button class="locate" onClick={() => {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    },() => null);
  }}
  ><img src={compass} width="45" height="45" alt="Locate Me"/></button>
  )
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
        style={{ width: 600 }}
          value={value}
          className="comboboxinput"
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}