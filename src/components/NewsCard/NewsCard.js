import React from "react";
import { Link } from "gatsby";
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';

const NewsCard = (props) => {
    const ImageRenderList = ({ item, imagename }) => {
        let processedImages = JSON.stringify({});
        if (item?.imagetransforms?.tile_image_Transforms) {
            processedImages = item?.imagetransforms?.tile_image_Transforms;
        }

        return (
            <ImageModule ImageSrc={item.tile_image} title={item.title} altText={item.title} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item.strapi_id} />
        )
    }

    return (
        <div className={`${props.tag == "landing" ? '' : "news-card-slide"}`}>
            <div className="news-card-wrapper">
                <div className="news-card-img-zoom">
                    <Link to={`/${PageLinks.news}/${props.data.slug}/`}>
                        <ImageRenderList item={props?.data} imagename={"blog.tile_image.small_image"} />
                    </Link>
                </div>
                <div className="news-card-text-wrapper">
                    <p className="news-card-title">
                        <Link to={`/${PageLinks.news}/${props.data.slug}/`}>
                            {props.data.title}
                        </Link>
                    </p>
                    <div className="news-card-date">{props.data.date}</div>
                </div>
            </div>
        </div>
    )
}

export default NewsCard