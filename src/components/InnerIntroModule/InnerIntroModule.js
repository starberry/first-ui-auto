import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StatsModule from "../StatsModule/StatsModule";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const InnerIntroModule = (props) => {
    return (
        <>
            <section className="inner-intro-wrapper">
                <Container>
                    <Row>
                        <Col xl={5}>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={100}>
                                {props.title &&
                                    <h2>{props.title}</h2>}
                            </ScrollAnimation>
                        </Col>
                        <Col xl={1}></Col>
                        <Col xl={6}>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={200}>
                                {props.short_description && <ContentModule Content={props.short_description?.data?.short_description} />}
                            </ScrollAnimation>
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

export default InnerIntroModule