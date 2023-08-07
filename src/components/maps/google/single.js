import React from "react"
// import React, { useEffect } from "react"
import { 
  GoogleMap, 
  useJsApiLoader, 
  // LoadScript, 
  // InfoWindow, 
  Marker
} from "@react-google-maps/api"
import { mapStyles } from "./constants"

import marker_icon from "../img/map-marker.svg";

const GoogleSingleMap = (props) => {
  const containerStyle = {
    width: "100%",
    height: props.height,
  }

  const center = {
    lat: props.lat,
    lng: props.lng,
  }

  const position = {
    lat: props.lat,
    lng: props.lng,
  }

  const [map, setMap] = React.useState(null);
  // const [streetView, setStreetView] = React.useState(props.streetView);

  // const [showingInfoWindow, setShowingInfoWindow] = React.useState(false);
  // const [activeMarker, setActiveMarker] = React.useState({});
  // const [selectedPlace, setSelectedPlace] = React.useState({});
  const [currentInfo, setCurrentInfo] = React.useState('');


  // useEffect(() => {
  //   setStreetView(props.streetView);
  // },[props.streetView]);


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  const onMarkerClick = (infoId, e) => {
    //setShowingInfoWindow(true);
    if(infoId === currentInfo) {
      setCurrentInfo('')
    } else {
      setCurrentInfo(infoId)
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // googleMapsApiKey: "AIzaSyBQ-jVFyV-gq5FjslKrQKe1Qk6hgejfN84"
    googleMapsApiKey: process.env.GATSBY_MAP_API_KEY
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        mapContainerClassName="property-details-map"
        zoom={14}
        onUnmount={onUnmount}
        options={{
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl:false
        }}
      >
        <Marker position={position} icon={marker_icon} >
        </Marker>

      </GoogleMap>
    
  ) : <></>
}

export default React.memo(GoogleSingleMap)