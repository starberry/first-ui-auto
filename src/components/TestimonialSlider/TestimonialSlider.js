import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));


const TestimonialSlider = (props) => {

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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: false,
                    dots: true,
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
        <section className="testimonial-slider-wrapper">
            <Slider className="testimonial-slider" {...settings}>
                {props?.data?.length > 0 && props.data?.map((module, index) => {
                    return (
                        <div className="testimonial-slide">
                            <TestimonialCard {...module} id={props.id} />
                        </div>
                    )
                }
                )}
            </Slider>
        </section>
    )
}

export default TestimonialSlider