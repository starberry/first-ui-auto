import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import loadable from "@loadable/component";
// import ScrollAnimation from 'react-animate-on-scroll';
import { Container, Row, Col } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
// import ModalBox from "../Modal/Modal"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';
import { PageLinks } from "../../common/site/page-static-links";
import ImageModule from "../../modules/image-render";
import { useAllStrapiTeam } from "../../hooks/use-all-strapiteam"
import SocialShare from "../SocialShare/SocialShare";

const FsLightbox = loadable(() => import("fslightbox-react"));
const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const PropertyBanner = (props) => {

    // Lightbox image popup
    const [propertyImage, setPropertyImage] = useState(false);
    // Lightbox image popup

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
    const url = typeof window !== 'undefined' ? window.location.href : ''

    var team_data = useAllStrapiTeam()
    team_data = team_data.allStrapiTeam.nodes
    let team_key;
    if (props?.negotiator_mapping != undefined) {
        for (let k in team_data) {
            if (props?.negotiator_mapping == team_data[k].property_team_mapping) {
                team_key = k;
                break;
            }
        }
    }

    let whatsAppNumber = team_key >= 0 && team_data[team_key]?.phone && team_data[team_key]?.phone?.replaceAll(' ', '')
    const omitArray = ["Sold", "Sold STC", "Let Agreed"]
    let isSoldRule = omitArray.includes(props?.status)
    return (
        <section className="property-banner-wrapper position-relative">
            <Container>
                <Row className="d-flex align-items-center">
                    <Col xl={4} className="order-xl-1 order-2">
                        {/* <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}> */}
                            <div className="property-banner-content-wrapper">
                                <button onClick={() => navigate(-1)} className="search-back d-flex align-items-center"><i className="icon icon-search-back"></i> <span>Back to Search Results</span></button>
                                <h1 className="property-heading">{props?.display_address}</h1>
                                <div className="property-price">{props?.price_qualifier !== "0" ? props?.price_qualifier : ''} {Site_Vars.default_currency}{props?.price.toLocaleString()}</div>
                                <div className="property-title">{props?.title}</div>
                                <div className="d-md-none property-share-mobile">
                                    <SocialShare
                                        iconClass="icon icon-share"
                                        shareText="Share"
                                    />
                                </div>
                                {!isSoldRule && <div className="property-btn-wrapper d-md-block d-none">
                                    <a className="button button-primary w-80" onClick={() => navigate('/book-a-viewing', { state: { id: props.crm_id, address: props?.display_address, pageurl: url, propImage: props.propImg && props.propImg.length > 0 ? props.propImg[0] : '' } })}>Enquire Now</a>
                                </div>}
                                {team_key >= 0 &&
                                    <div className="property-nego-wrapper d-flex align-items-center">
                                        <div className="property-nego-img ">
                                            <div className="gatsby-image-wrapper">
                                                {/* <StaticImage src="../../images/property_detail_nego_img.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" /> */}
                                                <ImageModule
                                                    ImageSrc={team_data[team_key]?.image}
                                                    altText={`negotiator_image`}
                                                    imagetransforms={team_data[team_key]?.imagetransforms?.imagetransforms}
                                                    imagename={`team.image.propdetails_image`}
                                                    renderer=""
                                                    strapi_id={team_data[team_key]?.strapi_id}
                                                    classNames="img-fluid rounded-circle"
                                                />
                                            </div>
                                        </div>
                                        <p className="property-nego-text">{`Speak with ${team_data[team_key].title} on `}<br /><a href={`tel:44${team_data[team_key].phone}`}>{team_data[team_key].phone}</a> or <Link to={`/${PageLinks.enquiry}/`}>Email</Link> or <Link to={`https://wa.me/44${whatsAppNumber}?text=Hi`} target="_blank">WhatsApp</Link></p>
                                    </div>
                                }
                            </div>
                        {/* </ScrollAnimation> */}
                    </Col>
                    <Col xl={1} className="order-xl-2"></Col>
                    <Col xl={7} className="order-xl-3 order-1">
                        <div className="property-banner-slider-wrapper position-static">
                        {props.status && <div className="status-tag">{props.status}</div>}
                            <Slider className="property-banner-slider" {...settings}>
                                {props.images && (props.images?.strapi_json_value).map((image, i) =>
                                    image.url && <div className="property-banner-slide">
                                        <div className="property-banner-img-zoom">
                                            <ImageModule
                                                ImageSrc={image}
                                                altText={`image`}
                                                imagetransforms={props?.processedImages}
                                                renderer=""
                                                lazyLoading={i == 0 ? false : true}
                                                imagename={props?.imagename}
                                                strapi_id={props?.strapi_id} classNames="img-fluid position-static"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Slider>
                            <ul className="list-inline property-banner-zoom-wrapper d-flex align-items-center">
                                <li className="list-inline-item">
                                    <button className="zoom-btn banner-arrow d-flex align-items-center justify-content-center">{currentSlide + 1}/{(props.propImg).length}</button>
                                </li>
                                <li className="list-inline-item">
                                    <button className="zoom-btn d-flex align-items-center justify-content-center" onClick={() => setPropertyImage(!propertyImage)}><i className="icon icon-zoom"></i> Enlarge</button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Property Lightbox popup */}
            <FsLightbox
                toggler={propertyImage}
                sources={props.propImg}
            />
            {/* Property Lightbox popup */}
        </section>
    )
}

export default PropertyBanner