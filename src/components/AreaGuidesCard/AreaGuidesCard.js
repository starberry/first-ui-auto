import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";

const AreaGuidesCard = (props) => {
    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.tile_image_Transforms) {
        processedImages = props?.imagetransforms?.tile_image_Transforms;
    }
    return (
        <div className="areaguides-card-wrapper">
            <div className="areaguides-img-wrapper">
                <Link to={`/${PageLinks.areaguide}/${props.slug}/`}>
                    <ImageModule ImageSrc={props.tile_image} title={props.title} altText={props.title} imagetransforms={processedImages} renderer="srcSet" imagename="area-guide.tile_image.small_image" strapi_id={props.strapi_id} />
                </Link>
            </div>
            <div className="areaguides-text-wrapper">
                <Link to={`/${PageLinks.areaguide}/${props.slug}/`}>{props.title}</Link>
            </div>
        </div>
    )
}

export default AreaGuidesCard