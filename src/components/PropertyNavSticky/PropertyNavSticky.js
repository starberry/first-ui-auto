import React, { useState } from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
// import ScrollAnimation from 'react-animate-on-scroll';
import loadable from "@loadable/component";
import SocialShare from "../SocialShare/SocialShare";
import './assets/styles/_index.scss';

const FsLightbox = loadable(() => import("fslightbox-react"));

const PropertyNavSticky = (props) => {

    // Lightbox image popup
    const [propertyImage, setPropertyImage] = useState(false);
    const [propertyVideo, setPropertyVideo] = useState(false);
    const [propertyFloor, setPropertyFloor] = useState(false);
    // Lightbox image popup

    let propertyVideoUrl = [];
    //if((data?.strapiProperty?.images).length > 0) {
    //for (let i = 0; i < props?.epc.strapi_json_value.length; i++) {
    // if (props?.video_tour?.strapi_json_value.length > 0) {
    //     propertyVideoUrl.push(props?.video_tour?.strapi_json_value[0].url);
    // }
    //}

    let propertyFloorImg = [];
    // for (let i = 0; i < props?.floorplan.strapi_json_value.length; i++) {
    if (props?.floorplan?.strapi_json_value.length > 0) {
        propertyFloorImg.push(props?.floorplan?.strapi_json_value[0].srcUrl);
    }
    //}

    // Handle scroll
    const handleClickScroll = () => {
        // const element = document.getElementById('property-desc-wrapper');
        const element = document.querySelector(".property-desc-wrapper");

        if (element) {
            // element.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                behavior: 'smooth',
                top:
                    element.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    100,
            })
        }
    };

    const handleClickScrollLoc = () => {
        const element = document.querySelector(".property-details-map-wrapper");

        if (element) {
            window.scrollTo({
                behavior: 'smooth',
                top:
                    element.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    200,
            })
        }
    }
    // Handle scroll

    
    const shareurl = typeof window !== 'undefined' ? window.location.href : ''

    const trackerShare = (event) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'click',
            'formType': shareurl,
            'formId': event,
            'formName': event,
            'formLabel': event
        });
    }

    return (
        <section className={`property-nav-sticky-wrapper d-flex align-items-center sticky-top ${props.tag}`}>
            <Container>
                <Row>
                    <Col>
                        <ul className="list-inline property-nav-sticky-list">
                            <li className="list-inline-item">
                                {/* <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}> */}
                                    <Link to="#!" className="active" onClick={handleClickScroll}>Details</Link>
                                {/* </ScrollAnimation> */}
                            </li>
                            <li className="list-inline-item">
                                {/* <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}> */}
                                    <Link to="#!" className="" onClick={handleClickScrollLoc}>Location</Link>
                                {/* </ScrollAnimation> */}
                            </li>
                            <li className="list-inline-item">
                                {/* <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}> */}
                                    <Link to="#" className="" onClick={() => setPropertyImage(!propertyImage)}>Gallery</Link>
                                {/* </ScrollAnimation> */}
                            </li>
                            {props?.video_tour != null &&
                                <li className="list-inline-item">
                                    {/* <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={400} offset={10}> */}
                                        <Link to="#" className="" onClick={() => {setPropertyVideo(!propertyVideo);trackerShare('Video Click')}}>Video</Link>
                                    {/* </ScrollAnimation> */}
                                </li>
                            }
                            <li className="list-inline-item">
                                {/* <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={500} offset={10}> */}
                                    <Link to="#" className="" onClick={() => setPropertyFloor(!propertyFloor)}>Floorplans</Link>
                                {/* </ScrollAnimation> */}
                            </li>
                            <li className="list-inline-item d-md-inline-block d-none">
                                {/* <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={600} offset={10}> */}
                                    <SocialShare
                                        iconClass="icon icon-share"
                                        shareText="Share"
                                    />
                                {/* </ScrollAnimation> */}
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            {/* Property Lightbox popup */}
            <FsLightbox
                toggler={propertyImage}
                sources={props.propImg}
            />
            <FsLightbox
                toggler={propertyVideo}
                sources={propertyVideoUrl}
            />
            <FsLightbox
                toggler={propertyFloor}
                sources={propertyFloorImg}
                type="image"
                types={[null]}
            />
            {/* Property Lightbox popup */}
        </section >
    )
}

export default PropertyNavSticky