import React, {useState, useEffect, useCallback, useRef} from "react";
import cab_marker from "../cab_marker.svg";
import cable_marker from "../cable_marker.svg";
import dp_marker from "../dp_marker.svg";
import mh_marker from "../mh_marker.svg";
import pole_marker from "../pole_marker.svg";
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
    width: '70vw',
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
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() =>{
        db.collection("facilities").onSnapshot(function(data){
            console.log(data);
            setFacilities(data.docs.map(doc => ({
                ...doc.data(),
            })))
        })
    },[])

    Object.keys(facilities).map(id =>{
        console.log(facilities[id].fac_id)
    })

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
        <h2> Locate Web </h2>
        <GoogleMap 
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            options={options}
            onLoad={onMapLoad}>

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
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={() => setSelected(facility)}
          />
        ))}

        {selected ? (<InfoWindow position={new window.google.maps.LatLng(parseFloat(selected.fac_gps.latitude),parseFloat(selected.fac_gps.longitude))}
                    onCloseClick={() => {
                      setSelected(null);
                    }}>
          <div>
            <h6>{selected.fac_id}</h6>
          </div>
        </InfoWindow>): null}
      
      </GoogleMap>
    </div>
    );
}