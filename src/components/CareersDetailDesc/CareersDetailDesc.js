import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import ContentModule from "../../modules/content-render";
import ImageModule from "../../modules/image-render";
import ScrollAnimation from 'react-animate-on-scroll';
import CareersDetailIntro from "../CareersDetailIntro/CareersDetailIntro";
import PlayVideo from "../PlayVideo/PlayVideo";
import './assets/styles/_index.scss';
const {ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const CareersDetailDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50)
        })
    },[])
    // Sticky scroll

    // Video play
    const [isPlay, setPlay] = useState(false)
    // Video play

    var imagename = "career.image.full_image";

    let processedImages = JSON.stringify({});
    if (props?.data.imagetransforms?.image_Transforms) {
        processedImages = props?.data.imagetransforms?.image_Transforms;
    }

    return (
        <section className="career-detail-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7} className="order-xl-1 order-2">
                        <CareersDetailIntro data={props.data}/>

                        <div className="inner-detail-desc">
                        <ScrollAnimation animateIn="animate__fadeIn" animateOnce delay={200} offset={10}><ContentModule Content={props.data.job_details?.data?.job_details} /></ScrollAnimation>
                        </div>
                    </Col>
                    <Col xl={1} className="order-xl-2"></Col>
                    <Col xl={4} className="order-xl-3 order-1">
                        <div className={`career-detail-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <div className="career-detail-img">
                                <div className="career-play">
                                    <button onClick={() => setPlay(true)} className="career-play-button">
                                        <div className="career-play-btn d-flex align-items-center justify-content-center">
                                            <i className="icon icon-play"></i>
                                        </div>
                                    </button>
                                    {/* {props.data.video_link && isPlay && ( */}
                                        <PlayVideo
                                            isOpen={isPlay}
                                            stopPlay={setPlay}
                                            videoId=""
                                            isCloseFunction={setPlay}
                                            videourl={props.data.video_link}
                                            htmlink={""}
                                        />
                                    {/* // )} */}
                                </div>
                                <ImageModule ImageSrc={props?.data.image} altText={props?.data.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.data.strapi_id} classNames="img-fluid" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default CareersDetailDesc