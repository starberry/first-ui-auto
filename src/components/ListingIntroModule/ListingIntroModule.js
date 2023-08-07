import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const ListingIntroModule = (props) => {
    return (
        <section className="listing-intro-wrapper">
            <Container>
                <Row>
                    <Col lg={8}>
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100}>
                            <h1>{props.headingTitle}</h1>
                            {props.content && <ContentModule Content={props.content?.data?.content} />}
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ListingIntroModule