import React, {useState, useRef } from "react"
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import iconUrl from "../img/map-marker.svg";

const LeafletSingleMap = (props) => {

  const center = {
    lat: props.lat ? props.lat : 51.5,
    lng: props.lng ? props.lng : 0.12,
  }

  const newicon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 28],
    popupAnchor: [10, -10],
    iconSize: [28, 28]
  });

  function MyMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
  
    return (
      <Marker
        draggable={draggable}
        position={position}
        icon={newicon}
        ref={markerRef} />
    )
  }

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "440px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MyMarker />
    </MapContainer>
  )
}

export default React.memo(LeafletSingleMap)