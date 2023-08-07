import React from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component";
import { useStaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
import { StaticImage } from "gatsby-plugin-image"
import ImageModule from "../../modules/image-render";
// import ContentModule from "../../modules/content-render";
// import CTALink from "../../modules/cta_link"
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const ReviewBadge = loadable(() => import("../ReviewsSlider/ReviewBadge"));


const Banner = (props) => {

    var imagename = "page.banner_section_banner_image.landing_banner_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms) {
        processedImages = props?.imagetransforms;
    }

    const { site } = useStaticQuery(
        graphql`
        query {
          site {
            siteMetadata {
                elfSight {
                  review
                  review_badge
                  review_carousel
                  review_page
                }
            }
          }
        }
      `
    )

    const elfData = site.siteMetadata?.elfSight

    return (
        <section className={`banner ${props.tag === "landing" ? "inner-page" : ""}`}>
            {
                props.tag === "landing" ?
                    <ImageModule ImageSrc={props?.image} altText={`${props?.image?.alternativeText ? props?.image?.alternativeText : props.banner_title ? props.banner_title : props.title} banner`} imagetransforms={processedImages} renderer="bgImg" imagename={imagename} strapi_id={props?.id} classNames="img-fluid banner-img" />
                    :
                    <ImageModule ImageSrc={props?.image} altText={`${props?.image?.alternativeText ? props?.image?.alternativeText : props.banner_title ? props.banner_title : props.title} banner`} imagetransforms={processedImages} renderer="bgImg" imagename={imagename} strapi_id={props?.id} classNames="img-fluid banner-img" />
            }
            <div className="overlay-bg"></div>
            <Container className="banner-search-container">
                <Row>
                    <Col lg={12}>

                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce>{props.banner_title && <h1>{props.banner_title}</h1>}</ScrollAnimation>
                        {props.banner_content && <ScrollAnimation animateIn="animate__slideInUp" delay={200} animateOnce><ContentModule Content={props.banner_content?.data?.banner_content} /></ScrollAnimation>}
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={100}>
                            <ul className="list-inline">
                                {props.cta_1_title && props.cta_1_link &&
                                    <li className="list-inline-item">
                                        <CTALink class="button button-primary " link={props.cta_1_link} title={props.cta_1_title} target_window={props.cta_1_link.target_window} />
                                    </li>
                                }
                                {props.cta_2_title && props.cta_2_link &&
                                    <li className="list-inline-item">
                                        <CTALink class="button button-secondary-outline-bg" link={props.cta_2_link} title={props.cta_2_title} target_window={props.cta_2_link.target_window} />
                                    </li>
                                }
                            </ul>
                        </ScrollAnimation>
                        {elfData.review && <div className="google-reviews d-flex align-items-center">
                            <ReviewBadge code={elfData.review_badge} />
                        </div>}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner