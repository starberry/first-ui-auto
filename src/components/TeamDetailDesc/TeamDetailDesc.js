import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import ImageModule from "../../modules/image-render";
// import ContentModule from "../../modules/content-render";
import TeamDetailIntro from "../TeamDetailIntro/TeamDetailIntro";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const TeamDetailDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50)
        })
    }, [])
    // Sticky scroll
    var imagename = "team.image.full_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.image_Transforms) {
        processedImages = props?.imagetransforms?.image_Transforms;
    }

    return (
        <section className="team-detail-desc-wrapper">
            <Container>
                <Row>
                    <Col lg={7} className="order-lg-1 order-2">
                        <TeamDetailIntro {...props} />

                        {props.content && <div className="inner-detail-desc">
                            <ScrollAnimation animateIn="animate__fadeIn" animateOnce delay={100} offset={10}><ContentModule Content={props.content?.data?.content} /></ScrollAnimation>
                        </div>}
                    </Col>
                    <Col xl={1} className="order-xl-2"></Col>
                    <Col xl={4} lg={5} className="order-lg-3 order-1">
                        <div className={`team-detail-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <div className="team-detail-img">
                                <ImageModule ImageSrc={props.image} title={props.name} altText={props.name} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props.strapi_id} />
                                {/* <StaticImage src="../../images/team_detail_img.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" /> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TeamDetailDesc