import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component"
import { PageLinks } from "../../common/site/page-static-links";
import ImageModule from "../../modules/image-render";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';

import NewHomesPropertiesImg_1 from "../../images/featured_img_1.png";
import NewHomesPropertiesImg_2 from "../../images/featured_img_2.png";
import NewHomesPropertiesImg_3 from "../../images/featured_img_3.png";

const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const NewHomesDetailsProperties = (props) => {

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

    return (
        <section className="featured-properties-wrapper new-homes-details-properties-wrapper">
            <Container>
                <Row>
                    <Col>
                        <h2 className="property-details">Other developments that may interest you</h2>
                        <div className="slider-text property-details"><span>Struggling to find a property?</span> <Link to={`/${PageLinks.contact}/`} className="link-underline">Get in touch</Link> and we'll help you find your ideal property.</div>

                        <Slider className="featured-properties-slider" {...settings}>
                            {props.properties && props.properties.map(({ node }, index) => {
                                let details_path = '/new-home-for-sale'
                                var imagename = "new-developments.images.results";

                                let processedImages = JSON.stringify({});
                                if (node?.imagetransforms?.images_Transforms) {
                                    processedImages = node?.imagetransforms?.images_Transforms;
                                }

                                // var image_all = JSON.parse(node.images.replace('\"', '"'))
                                return (
                                    <div className="featured-properties-slide">
                                        <div className="featured-properties-img-zoom">
                                            <Link to={details_path + '/' + node.slug + '-' + (node.strapi_id)+'/'}>
                                                <ImageModule ImageSrc={node.images[0]} altText={""} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={node?.strapi_id} classNames="img-fluid" />
                                            </Link>
                                        </div>
                                        <div className="featured-properties-text-wrapper">
                                            <div className="price">{node.display_address}</div>
                                            <div className="address">{node.price_qualifier} {Site_Vars.default_currency}{node?.price?.toLocaleString()} {node?.max_price ? ` - ${Site_Vars.default_currency}${node?.max_price?.toLocaleString()}` : ''}</div>
                                            <div className="title">{node.title}</div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewHomesDetailsProperties