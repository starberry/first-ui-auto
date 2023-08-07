import React from "react";
import loadable from "@loadable/component";
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image"
import './assets/styles/_index.scss';
import HomeBannerImage from "./HomeBannerImage";
import useDeviceMedia from "../../hooks/useDeviceMedia"
import useAutoPlayVideo from "../../hooks/useAutoPlayVideo"

// import ContentModule from "../../modules/content-render";
// import CTALink from "../../modules/cta_link"
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const ReviewBadge = loadable(() => import("../ReviewsSlider/ReviewBadge"));

const HomeBanner = (props) => {
    const videoRef = useAutoPlayVideo()
    const { isMobile, isTablet } = useDeviceMedia()
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
            <HomeBannerImage videoRef={videoRef}/>

            <div className="overlay-bg"></div>
            <Container className="banner-search-container">
                <Row>
                    <Col lg={12}>

                        {props.banner_title && <h1>{props.banner_title}</h1>}

                        {props.banner_content && <ContentModule Content={props.banner_content?.data?.banner_content} />}

                        <ul className="list-inline">
                            {props.cta_1_title && props.cta_1_link &&
                                <li className="list-inline-item">
                                    <CTALink class="button button-primary" link={props.cta_1_link} title={props.cta_1_title} target_window={props.cta_1_link.target_window} />
                                </li>
                            }
                            {props.cta_2_title && props.cta_2_link &&
                                <li className="list-inline-item">
                                    <CTALink class="button button-secondary-outline-bg" link={props.cta_2_link} title={props.cta_2_title} target_window={props.cta_2_link.target_window} />
                                </li>
                            }
                        </ul>
                        {elfData.review && <div className="google-reviews d-flex align-items-center">
                            <ReviewBadge code={elfData.review_badge} />
                        </div>}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HomeBanner