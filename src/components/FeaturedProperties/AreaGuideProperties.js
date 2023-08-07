import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import loadable from "@loadable/component"
import ImageModule from "../../modules/image-render";
import { ApiRequest } from "../../common/utils/api_request_utils";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';

import AreaguidePropertiesImg_1 from "../../images/featured_img_1.png";
import AreaguidePropertiesImg_2 from "../../images/featured_img_2.png";
import AreaguidePropertiesImg_3 from "../../images/featured_img_3.png";

const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const AreaGuideProperties = (props) => {

    const location = useLocation();
    const [propItems, setPropItems] = useState([])
    const [propItemsLet, setPropItemsLet] = useState([])
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
            url: `${process.env.GATSBY_STRAPI_SRC}/api/properties?filters[display_address][$contains]=${props.areaname}&filters[department][$eq]=residential&filters[search_type][$eq]=sales&pagination[pageSize]=8`
        }, (result) => {
            if (result) {
                setPropItems(result.data)
            }
        })
        ApiRequest({
            method: "GET",
            url: `${process.env.GATSBY_STRAPI_SRC}/api/properties?filters[display_address][$contains]=${props.areaname}&filters[department][$eq]=residential&filters[search_type][$eq]=lettings&pagination[pageSize]=8`
        }, (result) => {
            if (result) {
                setPropItemsLet(result.data)
            }
        })
    }, [props]);


    return (
        <React.Fragment>
            {((propItems && propItems.length > 0) || (propItems && propItemsLet.length > 0)) && <section className={`featured-properties-wrapper ${props.tag === "areaguide-properties" ? "areaguide-properties" : ""}`}>
                <Container>
                    <Row>
                        <Col>
                            <h2 className={props.tag === "areaguide-properties" ? "" : `text-center`}>Featured Properties in {props.areaname}</h2>
                            <Tabs
                                defaultActiveKey="forsale"
                                className="areaguide-detail-tab"
                            >
                                {propItems && propItems.length > 0 &&
                                    <Tab eventKey="forsale" title="For Sale">
                                        <Slider className="featured-properties-slider" {...settings}>
                                            {propItems && propItems.map((item, index) => {
                                                let details_path = '/property-for-sale'
                                                if (item.attributes.search_type == "lettings") {
                                                    details_path = '/property-to-rent'
                                                }
                                                let processedImages = JSON.stringify({});
                                                if (item?.attributes?.imagetransforms?.images_Transforms) {
                                                    processedImages = item?.attributes?.imagetransforms?.images_Transforms;
                                                }
                                                var imagename = "property.images.results";
                                                return (
                                                    <div className="featured-properties-slide">
                                                        <div className="featured-properties-img-zoom">
                                                            <Link to={details_path + '/' + item.attributes.slug + '/' + (item.attributes.id)}>
                                                                <ImageModule ImageSrc={item.attributes.images[0]} altText={""} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item.attributes?.id} classNames="img-fluid" />
                                                            </Link>
                                                        </div>
                                                        <div className="featured-properties-text-wrapper">
                                                            <div className="price">{item.attributes?.price_qualifier !== "0" ? item.attributes?.price_qualifier : ''} {Site_Vars.default_currency}{item.attributes?.price?.toLocaleString()}</div>
                                                            <div className="address">
                                                                <Link to={details_path + '/' + item.attributes.slug + '/' + (item.attributes.id)}>{item.attributes.display_address}</Link>
                                                            </div>
                                                            <div className="title">{item.attributes.title}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Slider>
                                    </Tab>}
                                {propItemsLet && propItemsLet.length > 0 &&
                                    <Tab eventKey="torent" title="To Rent">
                                        <Slider className="featured-properties-slider" {...settings}>
                                            {propItemsLet && propItemsLet.map((item, index) => {
                                                let details_path = '/property-for-sale'
                                                if (item.attributes.search_type == "lettings") {
                                                    details_path = '/property-to-rent'
                                                }
                                                let processedImages = JSON.stringify({});
                                                if (item?.attributes?.imagetransforms?.images_Transforms) {
                                                    processedImages = item?.attributes?.imagetransforms?.images_Transforms;
                                                }
                                                var imagename = "property.images.results";
                                                return (
                                                    <div className="featured-properties-slide">
                                                        <div className="featured-properties-img-zoom">
                                                            <Link to={details_path + '/' + item.attributes.slug + '/' + (item.attributes.id)}>
                                                                <ImageModule ImageSrc={item.attributes.images[0]} altText={""} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item.attributes?.id} classNames="img-fluid" />
                                                            </Link>
                                                        </div>
                                                        <div className="featured-properties-text-wrapper">
                                                            <div className="price">{item.attributes?.price_qualifier !== "0" && item.attributes.search_type !== "lettings" ? item.attributes?.price_qualifier : ''} {Site_Vars.default_currency}{item.attributes?.price?.toLocaleString()} {item.attributes?.price_qualifier !== "0" && item.attributes.search_type === "lettings" ? item.attributes?.price_qualifier : ''}</div>
                                                            <div className="address">
                                                                <Link to={details_path + '/' + item.attributes.slug + '/' + (item.attributes.id)}>{item.attributes.display_address}</Link>
                                                            </div>
                                                            <div className="title">{item.attributes.title}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </Slider>
                                    </Tab>}
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </section> }
        </React.Fragment>
    )
}

export default AreaGuideProperties