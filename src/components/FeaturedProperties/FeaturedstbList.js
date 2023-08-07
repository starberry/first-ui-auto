import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component"
import ScrollAnimation from 'react-animate-on-scroll';
import PropertyCard from "../PropertyCard/PropertyCard";
import { ApiRequest } from "../../common/utils/api_request_utils";
import ImageModule from "../../modules/image-render";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const FeaturedstbProperties = (props) => {

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
        ApiRequest({
            method: "GET",
            url: `${process.env.GATSBY_STRAPI_SRC}/api/stb-lists/item/Featured_Properties`
        }, (result) => {
            if (result.length > 0) {
                setPropItems(result)
            }
        })
    }, []);

    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        mailVars {
                            company_phone
                        }
                        content {
                            feature_property_content
                        }
                    }
                }
            }
        `
    )

    const siteData = site?.siteMetadata?.mailVars
    const content = site?.siteMetadata?.content?.feature_property_content

    let descContent = ''
    if (content) {
        descContent =  content
    } else {
        descContent = 
        <>
            As well as these featured properties, we also have a number of off-market properties, so do <a href={`tel:${siteData?.company_phone}`}>give us a call.</a>
        </>
    }

    return (
        <section className={`featured-properties-wrapper ${props.tag === "property-details" ? "similar-properties" : ""}`}>
            {propItems.length > 0 &&
                <Container>
                    <Row>
                        <Col>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}><h2 className={props.tag === "property-details" ? "" : `text-center`}>{props.tag === "property-details" ? "Other properties that may interest you" : "Featured Properties"}</h2></ScrollAnimation>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={20}><div className={`slider-text ${props.tag === "property-details" ? "" : "text-center"}`}>{descContent}</div></ScrollAnimation>
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
                                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={i * 100} offset={100}>
                                            <div className="featured-properties-slide">
                                                <div className="featured-properties-img-zoom">
                                                    <Link to={details_path + '/' + item.slug + '/' + (item.id)}>
                                                        <ImageModule ImageSrc={image_all[0]} altText={""} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item?.id} classNames="img-fluid" />
                                                    </Link>
                                                </div>
                                                <div className="featured-properties-text-wrapper">
                                                    <div className="price">{item.price_qualifier && item.price_qualifier !== "0" && item.search_type !== "lettings" ? item.price_qualifier : ''} {Site_Vars.default_currency}{item?.price?.toLocaleString()} {item.price_qualifier && item.price_qualifier !== "0" && item.search_type === "lettings" ? item.price_qualifier : ''}</div>
                                                    <div className="address">
                                                        <Link to={details_path + '/' + item.slug + '/' + (item.id)}>
                                                            {item.display_address}
                                                        </Link>
                                                    </div>
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
            }
        </section>
    )
}

export default FeaturedstbProperties