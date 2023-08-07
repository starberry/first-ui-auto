import React from "react";
import { Link, navigate } from "gatsby";
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";

import './assets/styles/_index.scss';

const TeamsCard = (props) => {
    const ImageRenderList = ({ item, imagename }) => {
        let processedImages = JSON.stringify({});
        if (item?.imagetransforms?.image_Transforms) {
            processedImages = item?.imagetransforms?.image_Transforms;
        }

        return (
            <ImageModule ImageSrc={item.image} title={item.title} altText={`${item.title} ${item.designation ? ' | ' + item.designation : ''}`} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item.strapi_id} />
        )
    }
    return (
        <div className="news-card-wrapper teams-wrapper">
            <div className="news-card-img-zoom teams-img">
                <Link to={`/${PageLinks.team}/${props.data.slug}/`}>
                    <ImageRenderList item={props?.data} imagename={"team.image.tile_image"} />
                </Link>
            </div>
            <div className="news-card-text-wrapper">
                <p className="news-card-title teams-title">
                    <Link to={`/${PageLinks.team}/${props.data.slug}/`}>
                        {props.data.title}
                    </Link>
                </p>
                {props.data.designation && <div className="teams-card-position">{props.data.designation}</div>}
                {props.data.phone && <div className="teams-card-mobile">
                    <a href={`tel:${props.data.phone}`}>{props.data.phone}</a>
                </div>}
                {props.data.email &&
                    <div className="teams-card-mail">
                        <a className="link-underline" onClick={() => navigate('/about/our-team/contact/', { state: { name: props.data.title, email:props.data.email  } })}>{props.data.email}</a>
                    </div>}
            </div>
        </div>
    )
}

export default TeamsCard