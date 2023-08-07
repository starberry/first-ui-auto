import React from "react";
// import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
// import { StaticImage, getImage } from "gatsby-plugin-image";
// import ContentModule from "../../modules/content-render";
import ImageModule from "../../modules/image-render";
import StatsModule from "../StatsModule/StatsModule";
import ScrollAnimation from 'react-animate-on-scroll';
// import CTALink from "../../modules/cta_link"
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const IntroModule = (props) => {
    return (
        <>
            <section className="intro-wrapper">
                <Container>
                    <Row>
                        <Col lg={8}>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={100}>
                                {props.title &&
                                    <h2>{props.title}</h2>}
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={100}>
                                {props.short_description && <ContentModule Content={props.short_description?.data?.short_description} />}
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={100}>
                            {props.cta_link && <CTALink class="button button-secondary-outline" link={props.cta_link} title={props.cta_title} target_window={props.cta_link.target_window} />}</ScrollAnimation>
                        </Col>
                        <Col lg={1}></Col>
                        <Col lg={3}>
                            {props.right_tiles_module_title && <h5>{props.right_tiles_module_title}</h5>}
                            <ul className="list-unstyled intro-list">
                                {props.add_new && props.add_new.map((item, index) => {
                                    var imagename = "page.explore_section_tile_image.explore_tile_image";

                                    let processedImages = JSON.stringify({});
                                    if (props?.imagetransforms?.explore_section_tile_image_Transforms) {
                                        processedImages = props?.imagetransforms?.explore_section_tile_image_Transforms;
                                    }
                                    return (
                                        <li>
                                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={index * 100} offset={100}>
                                                <div className="d-flex align-items-center">
                                                    <ImageModule ImageSrc={item?.tile_image} altText={item?.tile_image?.alternativeText ? item?.tile_image?.alternativeText : item.title} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                                                    {/* <StaticImage src={image} layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" /> */}
                                                    {item.link && <CTALink class="link-underline primary" link={item.link} title={item.title} target_window={item.link.target_window}><span>{item.title}</span></CTALink>}
                                                </div>
                                            </ScrollAnimation>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {
                props.Statistics &&
                <section className="stats-wrapper-bg">
                    <StatsModule stats={props.Statistics} tag={props.layout} />
                </section>
            }
        </>
    )
}

export default IntroModule