import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";

import NewHomesBannerImg from "../../images/new_homes_img.png";

const FsLightbox = loadable(() => import("fslightbox-react"));
const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const NewHomesDetailsBanner = (props) => {

    // Lightbox image popup
    const [propertyImage, setPropertyImage] = useState(false);
    // Lightbox image popup
    const url = typeof window !== 'undefined' ? window.location.href : ''

    // Slider settings
    const [currentSlide, setCurrentSlide] = useState("");

    const handleAfterChange = (index) => {
        setCurrentSlide(index);
    };

    let settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        afterChange: handleAfterChange
    }
    // Slider settings

    return (
        <section className="new-homes-details-banner-wrapper">
            <Slider className="new-homes-details-banner-slider" {...settings}>
                {(props.images.strapi_json_value).map((image, i) =>
                    image.url &&
                    <div className="new-homes-details-banner-slide">
                        <div className="new-homes-details-banner-img-zoom">
                            {/* <ImageModule
                                ImageSrc={image}
                                altText={`image`}
                                imagetransforms={props?.processedImages}
                                renderer=""
                                lazyLoading={i == 0 ? false : true}
                                imagename={props?.imagename}
                                strapi_id={props?.strapi_id} classNames="img-fluid"
                            /> */}
                            <img src={image.srcUrl} className="img-fluid" alt="" />
                        </div>
                    </div>
                )}
            </Slider>
            <div className="overlay-bg"></div>
            <ul className="list-inline new-homes-details-banner-zoom-wrapper d-flex align-items-center">
                <li className="list-inline-item">
                    <button className="zoom-btn banner-arrow d-flex align-items-center justify-content-center">{currentSlide + 1}/{(props.propImg).length}</button>
                </li>
                <li className="list-inline-item">
                    <button className="zoom-btn d-flex align-items-center justify-content-center" onClick={() => setPropertyImage(!propertyImage)}><i className="icon icon-zoom"></i> Enlarge</button>
                </li>
            </ul>

            <div className="new-homes-details-banner-slider-wrapper">
                <Container className="new-homes-details-banner-container">
                    <Row>
                        <Col lg={12}>
                            <h2>{props.display_address}</h2>
                            <p className="new-homes-price">{props.price_qualifier} {Site_Vars.default_currency}{props?.price?.toLocaleString()} {props?.max_price ? ` - ${Site_Vars.default_currency}${props?.max_price?.toLocaleString()}` : ''}</p>
                            <p className="new-homes-title">{props.title}</p>
                            <ul className="list-inline d-md-block d-none">
                                <li className="list-inline-item">
                                    <a className="button button-primary" onClick={() => navigate('/book-a-viewing', { state: { id: props.crm_id, address: props?.display_address, pageurl: url, propImage: props.propImg && props.propImg.length > 0 ? props.propImg[0] : '' } })}>Enquire Now</a>
                                    {/* <Link className="button button-primary" to="">Enquire now</Link> */}
                                </li>
                                <li className="list-inline-item">
                                    <Link className="button button-secondary-outline-bg" to="">Call 01538 702394</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Property Lightbox popup */}
            <FsLightbox
                toggler={propertyImage}
                sources={props.propImg}
            />
            {/* Property Lightbox popup */}
        </section>
    )
}

export default NewHomesDetailsBanner