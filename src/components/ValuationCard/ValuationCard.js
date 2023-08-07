import React from "react";
// import CTALink from "../../modules/cta_link"
// import ContentModule from "../../modules/content-render";
import ImageModule from "../../modules/image-render";
// import { StaticImage } from "gatsby-plugin-image";
import './assets/styles/_index.scss';
const {ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const {CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const ValuationCard = (props) => {
    var imagename = "page.valuation_section_tile_image.valuation_tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.valuation_section_tile_image_Transforms) {
        processedImages = props?.imagetransforms?.valuation_section_tile_image_Transforms;
    }
    return (
        <div className="valuation-card-wrapper">
            <div className="valuation-card-img">
                <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
            </div>
            <div className="valuation-card-text">
                <div className="valuation-title">{props.title}</div>
                {props.content && <ContentModule Content={props.content?.data?.content} />}
                {props.cta_link &&
                    <CTALink class="button button-primary" link={props.cta_link} title={props.cta_title} target_window={props.cta_link.target_window} />
                }
            </div>
        </div>
    )
}

export default ValuationCard