import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import { StaticImage } from "gatsby-plugin-image";
import loadable from "@loadable/component"
import PropertyCard from "../PropertyCard/PropertyCard";
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";
import { ApiRequest } from "../../common/utils/api_request_utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const SimilarProperties = (props) => {

    const [propItems, setPropItems] = useState([])
    //const [processedImages, setProcessedImages] = useState([])

    // Slider settings
    let settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: false,
                    dots: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    speed: 400,
                    arrows: false,
                    dots: true,
                },
            },
        ],
    }
    // Slider settings
    useEffect(() => {
        if (props?.prop_id) {
            ApiRequest({
                method: "GET",
                url: `${process.env.GATSBY_STRAPI_SRC}/api/stb-lists/item/property-details?pid=${props?.prop_id}`
            }, (result) => {
                if (result.length > 0) {
                    setPropItems(result)
                }
            })
        }
    }, [props]);
    return (
        <React.Fragment>
            {propItems.length > 0 &&
                <section className={`featured-properties-wrapper ${props.tag === "property-details" ? "similar-properties" : ""}`}>
                    <Container>
                        <Row>
                            <Col>
                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                    <h2 className={props.tag === "property-details" ? "" : `text-center`}>{props.tag === "property-details" ? "Other properties that may interest you" : "Featured Properties"}</h2>
                                    <div className={`slider-text ${props.tag === "property-details" ? "" : "text-center"}`}><span>Struggling to find a property?</span> <Link to={`/${PageLinks.enquiry}/`} className="link-underline">Get in touch</Link> and we'll help you find your ideal property.</div>
                                </ScrollAnimation>
                                <Slider className="featured-properties-slider" {...settings}>
                                    {propItems?.map((item, i) => {
                                        let details_path = '/property-for-sale'
                                        if (item.search_type == "lettings") {
                                            details_path = '/property-to-rent'
                                        }
                                        var imagename = "property.images.results";

                                        let processedImages = JSON.stringify({});
                                        if (item?.imagetransforms?.images_Transforms) {
                                            processedImages = item?.imagetransforms?.images_Transforms;
                                        }

                                        var image_all = JSON.parse(item.images.replace('\"', '"'))
                                        return (
                                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={i * 100} offset={10}>
                                                <div className="featured-properties-slide">
                                                    <div className="featured-properties-img-zoom">
                                                        <Link to={details_path + '/' + item.slug + '/' + (item.id)}>
                                                            <ImageModule ImageSrc={image_all[0]} altText={""} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item?.id} classNames="img-fluid" />
                                                            {/* <StaticImage src="../../images/featured_img_1.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" /> */}
                                                        </Link>
                                                    </div>
                                                    <div className="featured-properties-text-wrapper">
                                                        <div className="price">{item.price_qualifier && item.price_qualifier !== "0" && item.search_type !== "lettings" ? item?.price_qualifier : ''} {Site_Vars.default_currency}{item?.price?.toLocaleString()} {item.price_qualifier && item.price_qualifier !== "0" && item.search_type === "lettings" ? item?.price_qualifier : ''}</div>
                                                        <div className="address">{item.display_address}</div>
                                                        <div className="title">{item.title}</div>
                                                    </div>
                                                </div>
                                            </ScrollAnimation>
                                        )
                                    }
                                    )}

                                </Slider>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }
        </React.Fragment>
    )
}

export default SimilarProperties