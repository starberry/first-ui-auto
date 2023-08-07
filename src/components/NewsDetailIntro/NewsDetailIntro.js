import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import SocialShare from "../SocialShare/SocialShare";
import _ from "lodash";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';

const NewDetailIntro = (props) => {
    // console.log("cccc", props.category)

    function capitalizeWords(arr) {
        return arr.map((word) => {
            const capitalizedFirst = word.charAt(0).toUpperCase();
            const rest = word.slice(1).toLowerCase();
            return capitalizedFirst + rest;
        });
    }

    var cat_list = ''
    if (props.category) {
        cat_list = capitalizeWords(props.category?.strapi_json_value)
    }


    return (
        <section className="news-detail-intro-wrapper">
            <Container>
                <Row>
                    <Col lg={7}>
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce><h1>{props.title}</h1>
                            <ul className="list-inline news-detail-list d-md-flex align-items-center">
                                {props.date && <li className="list-inline-item">
                                    <div className="news-detail-text">{props.date}</div>
                                </li>}
                                {props.category && <li className="list-inline-item">
                                    <div className="news-detail-text">{String(cat_list).replace(",", ", ")}</div>
                                </li>}
                                {props.author &&
                                    <li className="list-inline-item">
                                        <div className="news-detail-text">by <Link to={`/${PageLinks.team}/${props.author?.slug}`} className="link-underline">{props.author?.name}</Link></div>
                                    </li>
                                }

                                <li className="list-inline-item">
                                    <SocialShare
                                        iconClass="icon icon-share"
                                        shareText="Share"
                                    />
                                </li>
                            </ul>
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewDetailIntro