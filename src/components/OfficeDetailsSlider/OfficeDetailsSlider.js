import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component"
import ScrollAnimation from 'react-animate-on-scroll';
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';

import OfficeDetailsImg_1 from "../../images/team_img_1.png";

const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const Slider = loadable(() => import("react-slick"));

const OfficeDetailsSlider = (props) => {

    // Slider settings
    let settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
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
        <section className="office-details-slider-wrapper">
            <Container>
                <Row>
                    <Col>
                        <div className="intro">
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                {props.team_intro && <ContentModule Content={props.team_intro?.data?.team_intro} />}
                            </ScrollAnimation>
                        </div>

                        <Slider className="office-details-slider" {...settings}>
                            {props.team && props.team?.map((item, index) => {
                                let processedImages = JSON.stringify({});
                                if (item?.imagetransforms?.image_Transforms) {
                                    processedImages = item?.imagetransforms?.image_Transforms;
                                }
                                return (
                                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={index * 100} offset={10}>
                                        <div className="office-details-slide">
                                            <div className="office-details-img-zoom">
                                                <Link to={`/${PageLinks.team}/${item.slug}/`}>
                                                    <ImageModule ImageSrc={item.image} title={item.title} altText={`${item.title} ${item.designation ? ' | ' + item.designation : ''}`} imagetransforms={processedImages} renderer="srcSet" imagename={"team.image.tile_image"} strapi_id={item.strapi_id} />
                                                </Link>
                                            </div>
                                            <div className="office-details-card-text-wrapper">
                                                {item.title && <p className="office-details-card-title">
                                                    <Link to={`/${PageLinks.team}/${item.slug}/`}>{item.title}</Link>
                                                </p>}
                                                {item.designation && <div className="office-details-card-position">{item.designation}</div>}
                                                {item.phone && <div className="office-details-card-mobile">
                                                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                                                </div>}
                                                {item.email && <div className="office-details-card-mail">
                                                    <Link to={`/${PageLinks.enquiry}/`} className="link-underline">{item.email}</Link>
                                                </div>}
                                            </div>
                                        </div>
                                    </ScrollAnimation>
                                )
                            })}
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfficeDetailsSlider