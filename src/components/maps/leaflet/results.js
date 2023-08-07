import React, {useState, useRef, useMemo } from "react"
import Leaflet, {latLngBounds} from "leaflet";
import loadable from "@loadable/component"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, latLngBound, useMapEvent } from 'react-leaflet'

import iconUrl from "../img/map-marker.svg";
const PropertyCard = loadable(() => import("../../PropertyCard/PropertyCard"));

const LeafletResultsMap = (props) => {

  const center = props.hits[0]._geoloc;

  const boundsArr = new Array(0)

  props.hits.map((position,i) => {
    if( position?._geoloc?.lat != "" && position?._geoloc?.lng ){
      boundsArr.push([position._geoloc.lat, position._geoloc.lng])
    }
  })

  const bounds = useMemo(() => {
    const b = latLngBounds() // seemed to work without having to pass init arg
    boundsArr.forEach(coords => {
        b.extend(coords)
    })
    return b
  }, [boundsArr])

  const newicon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 28],
    popupAnchor: [10, -10],
    iconSize: [28, 28]
  });

  function LocationMarker() {
    // const map = useMapEvent('popupopen', (e) => {
    //   //map.setView([e.popup._latlng.lat, e.popup._latlng.lng], map.getZoom())
    // })
    return null
  }

  function MyMarker(props) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)

    return (
      <>
      {typeof props.position != "undefined" &&
        <Marker
          draggable={draggable}
          position={props?.position}
          key={props?.key}
          icon={newicon}
          ref={markerRef}>
          <Popup minWidth="270" maxWidth="270" maxHeight="auto" autoPan={true}>
            <div className="marker-tooltip">
              <PropertyCard data={props.data} key={props.pcardkey} propertyTypeVal={props.propertyTypeVal}/>
            </div>
          </Popup>
        </Marker>
      }
      </>
    )
  }

  return (
    <div className="map">
      <MapContainer bounds={bounds} scrollWheelZoom={false} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        { (props.hits).map((location, i) => (
          <MyMarker key={(location.crm_id)} position={location?._geoloc} data={location} pcardkey={i} propertyTypeVal={props.propertyTypeVal} />
          ))
        }
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export default React.memo(LeafletResultsMap)