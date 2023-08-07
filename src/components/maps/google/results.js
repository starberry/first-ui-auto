import React from "react"
import loadable from "@loadable/component"
// import React, { useEffect } from "react"
import { 
  GoogleMap, 
  useJsApiLoader, 
  // LoadScript, 
  //apiIsLoaded,
  //MarkerClusterer,
  InfoWindow, 
  Marker
} from "@react-google-maps/api"
import { mapStyles } from "./constants"
// const marker_icon = loadable(() => import("../img/map-marker.svg"));
import marker_icon from "../img/map-marker.svg";
const PropertyCard = loadable(() => import("../../PropertyCard/PropertyCard"));

function GoogleResultMap (props) {
  const containerStyle = {
    width: "100%",
    height: props.height,
  }

  const center = props.hits[0]._geoloc;
  
  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  }

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  }

  const [map, setMap] = React.useState(null);

  const [currentInfo, setCurrentInfo] = React.useState('');


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
  
    (props.hits).forEach((place) => {
      bounds.extend(new window.google.maps.LatLng(
        place?._geoloc?.lat,
        place?._geoloc?.lng,
      ));
    });
    map.fitBounds(bounds);

    setMap(map)
  }, [])


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

  // const getMapBounds = (map, maps, places) => {
  //   const bounds = new maps.LatLngBounds();
  
  //   (props.hits).forEach((place) => {
  //     bounds.extend(new maps.LatLng(
  //       place?._geoloc.lat,
  //       place?._geoloc.lng,
  //     ));
  //   });
  //   return bounds;
  // };
  
  // // Re-center map when resizing the window
  // const bindResizeListener = (map, maps, bounds) => {
  //   maps.event.addDomListenerOnce(map, 'idle', () => {
  //     maps.event.addDomListener(window, 'resize', () => {
  //       map.fitBounds(bounds);
  //     });
  //   });
  // };
  
  // Fit map to its bounds after the api is loaded
  // const apiIsLoaded = (map, maps, places) => {
  //   // Get bounds by our places
  //   const bounds = getMapBounds(map, maps, places);
  //   // Fit map to bounds
  //   map.fitBounds(bounds);
  //   // Bind the resize listener
  //   //bindResizeListener(map, maps, bounds);
  // };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // googleMapsApiKey: "AIzaSyBQ-jVFyV-gq5FjslKrQKe1Qk6hgejfN84"
    googleMapsApiKey: process.env.GATSBY_MAP_API_KEY
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        defaultZoom={7}
        mapContainerClassName="property-results-map map"
        onUnmount={onUnmount}
        onLoad={onLoad}
        options={{
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl:false
        }}

      >
        {/* <MarkerClusterer options={options}>
          {(clusterer) =>
            locations.map((location) => (
              <Marker key={createKey(location)} position={location} clusterer={clusterer}  icon={marker_icon} />
            ))
          }
        </MarkerClusterer> */}
        { (props.hits).map((location, i) => (
        <Marker key={(location.crm_id)} position={location?._geoloc} icon={marker_icon} onClick={(e) => onMarkerClick((location.crm_id), e)} >
        {
            currentInfo === (location.crm_id) && (
            <InfoWindow
              marker={true}
              visible={true}           
            >
              <div className="marker-tooltip">
                <PropertyCard data={location} key={i} propertyTypeVal={props.propertyTypeVal}/>
              </div>
            </InfoWindow>    
          )
        }
        </Marker>
        ))
        }

      </GoogleMap>
    
  ) : <></>
}

export default React.memo(GoogleResultMap)