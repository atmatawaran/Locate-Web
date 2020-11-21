import React, {useState, useEffect, useCallback, useRef} from "react";
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