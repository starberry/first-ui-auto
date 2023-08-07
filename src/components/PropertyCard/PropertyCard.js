import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { StaticImage } from "gatsby-plugin-image";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { Site_Vars } = require("../../common/site/config");

const PropertyCard = (props) => {
    let details_path = '/property-for-sale'
    const location = useLocation();
    if (props.data.search_type == "lettings") {
        details_path = '/property-to-rent'
    }
    if (props.propertyTypeVal == "new_developments") {
        details_path = '/new-home-for-sale'
    }
    var imagename = "property.images.results";
    let propid = ''
    if (props?.data?.strapi_id)
        propid = props.data.strapi_id
    else if (props?.data?.objectID)
        propid = props.data.objectID

    let propCount = props.data?.title?.slice(0, 1)
    let title = isNaN(propCount) && props.data?.title?.slice(0, 1).toUpperCase() + props.data?.title?.slice(1);
    title ||= props?.data?.title

    return (
        <div className="property-card-wrapper">
            <div className="property-card-img-zoom">
                {props.data.status && <div className="status-tag">{props.data.status}</div>}
                <Link to={details_path + '/' + props.data.slug + '/' + (propid) + '/'}>

                    {props.tag == "no-result" && props.data.images?.strapi_json_value.length > 0 &&
                        <ImageModule ImageSrc={props.data.images?.strapi_json_value[0]} altText={""} imagetransforms={props.processedImages} renderer="srcSet" imagename={imagename} strapi_id={props.data?.strapi_id} classNames="img-fluid" />
                    }

                    {props.tag != "no-result" && props.data?.images.length > 0 &&
                        <img fetchpriority={props.myindexval == 0 ? "low" : "low"} loading={props.myindexval < 6 ? "eager" : "lazy"} src={props.data?.images[0]['416x300']} alt="banner" className="img-fluid" />
                    }
                    {props.tag != "no-result" && props.data?.images.length == 0 &&
                        <StaticImage src="../../images/no-image.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" />
                    }
                </Link>
            </div>
            <div className="property-card-text-wrapper">

                {props.propertyTypeVal !== "new_developments" ? <div className="price-details">{props.data?.price_qualifier !== "0" && props.data.search_type !== "lettings" ? props.data?.price_qualifier : ''} {Site_Vars.default_currency}{props.data?.price?.toLocaleString()} {props.data?.price_qualifier !== "0" && props.data.search_type === "lettings" ? props.data?.price_qualifier : ''}</div> : <div className="price-details">{props.data.price_qualifier} {Site_Vars.default_currency}{props.data?.price?.toLocaleString()} {props.data?.max_price ? ` - ${Site_Vars.default_currency}${props.data?.max_price?.toLocaleString()}` : ''}</div>}

                <p className="display-address">
                    <Link to={details_path + '/' + props.data.slug + '/' + (propid) + '/'}>
                        {props.data.display_address}
                    </Link>
                </p>
                <div className="property-title">{title}</div>
            </div>
        </div>
    )
}

export default PropertyCard