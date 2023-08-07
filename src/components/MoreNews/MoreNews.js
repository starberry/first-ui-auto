import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import NewsCard from "../NewsCard/NewsCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../NewsTab/assets/styles/_index.scss';

const Slider = loadable(() => import("react-slick"));

const MoreNews = (props) => {

    // Slider settings
    let settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
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
        <div className="more-news-section news-tab-wrapper ">
            <Container>
                <Row>
                    <Col>
                        <h3 className="d-none d-md-block">More news that may interest you</h3>
                        <h3 className="d-md-none">Related News</h3>

                        <Slider className="more-news-slider" {...settings}>
                            {props.data?.map(({ node }, index) => {
                                return (
                                    <NewsCard data={node} />
                                )
                            }
                            )}
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MoreNews