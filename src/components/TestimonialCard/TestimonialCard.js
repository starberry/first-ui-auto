import React, { useState } from "react";
import ImageModule from "../../modules/image-render";
import PlayVideo from "../PlayVideo/PlayVideo";
import './assets/styles/_index.scss';

const TestimonialCard = (props) => {

    // Video play
    const [isPlay, setPlay] = useState(false)
    // Video play
    var imagename = "page.review_section_tile_image.review_tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.tile_section_image_Transforms) {
        processedImages = props?.imagetransforms?.tile_section_image_Transforms;
    }

    return (
        <div className="testimonial-card-wrapper">
            <div className="testimonial-detail-img">
                <div className="testimonial-play">
                    <button onClick={() => setPlay(true)} className="testimonial-play-button">
                        <div className="testimonial-play-btn d-flex align-items-center justify-content-center">
                            <i className="icon icon-play"></i>
                        </div>
                    </button>
                    {isPlay && props.video_link && (
                        <PlayVideo
                            isOpen={isPlay}
                            stopPlay={setPlay}
                            videoId=""
                            isCloseFunction={setPlay}
                            videourl={props.video_link}
                            htmlink={""}
                        />
                    )}
                </div>
                <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
            </div>
        </div>
    )
}

export default TestimonialCard