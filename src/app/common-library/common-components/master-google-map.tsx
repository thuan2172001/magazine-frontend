import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const GOOGLE_API_KEY = 'AIzaSyAo9NQidEeQkObQ6mVyp1IYBpNneVMMsB4';

interface MapProps {
  location: { latitude: number; longitude: number };
}

function MasterGoogleMap({ location }: MapProps) {
  const { latitude, longitude } = location;
  return (
    <LoadScript id="script-loader" googleMapsApiKey={GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={8}
        center={{ lat: latitude, lng: longitude }}>
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MasterGoogleMap;
