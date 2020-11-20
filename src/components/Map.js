import React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

const libraries = ["places"];
const mapContainerStyle = {
    width: '70vw',
    height: '100vh'
}

const center = {
    lat: 14.522820, 
    lng: 121.269638
}

export default function Map(){
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
        <GoogleMap 
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}>
            </GoogleMap>
    </div>
    );
}