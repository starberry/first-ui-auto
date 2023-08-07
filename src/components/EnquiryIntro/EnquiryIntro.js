import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
const {ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const EnquiryIntro = (props) => {
    return (
        <section className="enquiry-intro-wrapper">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={7} className="text-center">
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>{props.titlesm && <div className="enquiry-intro-sm">{props.titlesm}</div> }</ScrollAnimation>
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}><h1>{props.title}</h1></ScrollAnimation>
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>{props.content && <ContentModule Content={props.content?.data?.content} />}</ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default EnquiryIntro