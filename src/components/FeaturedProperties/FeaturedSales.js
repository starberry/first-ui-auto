import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import _ from "lodash"
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component"
import ScrollAnimation from 'react-animate-on-scroll';
import PropertyCard from "../PropertyCard/PropertyCard";
import ImageModule from "../../modules/image-render";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const FeaturedSales = (props) => {

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

    const data = useStaticQuery(
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
                allStrapiProperty(
                    filter: {featured: {eq: true}, search_type: {eq: "sales"}, publish: {eq: true}}
                  ) {
                    edges {
                      node {
                        id
                        slug
                        crm_id
                        strapi_id
                        images {
                          strapi_json_value {
                            url
                          }
                        }
                        price_qualifier
                        price
                        search_type
                        title
                        display_address
                        imagetransforms {
                          images_Transforms
                        }
                      }
                    }
                }
            }
        `
    )

    const siteData = data?.site?.siteMetadata?.mailVars
    const propertyData = data?.allStrapiProperty?.edges
    const content = data?.site?.siteMetadata?.content?.feature_property_content

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
            {propertyData.length > 0 &&
                <Container>
                    <Row>
                        <Col>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}><h2 className={props.tag === "property-details" ? "" : `text-center`}>{props.tag === "property-details" ? "Other properties that may interest you" : "Featured Properties"}</h2></ScrollAnimation>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={20}><div className={`slider-text ${props.tag === "property-details" ? "" : "text-center"}`}>{descContent}</div></ScrollAnimation>
                            <Slider className="featured-properties-slider" {...settings}>
                                {_.shuffle(propertyData)?.map(({node}, i) => {
                                    let details_path = '/property-for-sale'
                                    if (node.search_type == "lettings") {
                                        details_path = '/property-to-rent'
                                    }
                                    var imagename = "property.images.results";

                                    let processedImages = JSON.stringify({});
                                    if (node?.imagetransforms?.images_Transforms) {
                                        processedImages = node?.imagetransforms?.images_Transforms;
                                    }

                                    var image_all = node.images?.strapi_json_value

                                    return (
                                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={i * 100} offset={100}>
                                            <div className="featured-properties-slide">
                                                <div className="featured-properties-img-zoom">
                                                    <Link to={details_path + '/' + node.slug + '/' + (node.strapi_id)}>
                                                        <ImageModule ImageSrc={image_all[0]} altText={""} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={node?.strapi_id} classNames="img-fluid" />
                                                    </Link>
                                                </div>
                                                <div className="featured-properties-text-wrapper">
                                                    <div className="price">{node.price_qualifier && node.price_qualifier !== "0" ? node.price_qualifier : ''} {Site_Vars.default_currency}{node?.price?.toLocaleString()}</div>
                                                    <div className="address">
                                                        <Link to={details_path + '/' + node.slug + '/' + (node.strapi_id)}>
                                                            {node.display_address}
                                                        </Link>
                                                    </div>
                                                    <div className="title">{node.title}</div>
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

export default FeaturedSales