import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';

const StatsModule = (props) => {
    return (
        <>
            {props?.stats && props?.stats?.length > 0 &&
                <div className={`stats-wrapper ${props.tag === "landing_page" ? "inner-page" : ""}`}>
                    <Container>
                        {
                            process.env.GATSBY_STATS_TITLE &&
                            <Row>
                                <Col className="text-center">
                                    <div className="stats-title">
                                        <h2>{process.env.GATSBY_STATS_TITLE}</h2>
                                    </div>
                                </Col>
                            </Row>
                        }
                        <Row>
                            {props.stats && props.stats.length > 0 && props.stats.map((item, i) => (
                                <Col xl={3} md={6}>
                                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={(i+1) * 200} offset={100}>
                                        <div className="stats-card">
                                            <div className="stats-title">{item.stats_title}</div>
                                            {item.stats_description && <div className="stats-text">{item.stats_description}</div>}
                                        </div>
                                    </ScrollAnimation>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            }
        </>
    )
}

export default StatsModule