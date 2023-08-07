import React from "react";
import loadable from "@loadable/component";
//import GoogleSingleMap from "../maps/google/single";
import './assets/styles/_index.scss';
const GoogleSingleMap = loadable(() => import("../maps/google/single"));
const LeafletSingleMap = loadable(() => import("../maps/leaflet/single"));

const PropertyDetailsMap = (props) => {
    const mapService = process.env.GATSBY_MAP_PROVIDER == "leaflet" ? "leaflet" : "google";
    return (
        <section className="property-details-map-wrapper" id="property-details-map-wrapper">
            {mapService == "google" &&
                <GoogleSingleMap lat={props?.lat} lng={props?.lng} />
            }
            {mapService == "leaflet" &&
                <LeafletSingleMap lat={props?.lat} lng={props?.lng} />
            }
        </section>
    )
}

export default PropertyDetailsMap