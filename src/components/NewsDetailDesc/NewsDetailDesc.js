import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
const ImageModule = loadable(() => import("../../modules/image-render"));
const ContentModule = loadable(() => import("../../modules/content-render"));
const NewsDetailAccordion = loadable(() => import("../NewsDetailAccordion/NewsDetailAccordion"));
const PropertyValuationCard = loadable(() => import("../PropertySidebar/PropertyValuationCard"));
const NewsDetailSubscribe = loadable(() => import("../NewsDetailSubscribe/NewsDetailSubscribe"));

const NewsDetailDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 250)
        })
    }, [])
    // Sticky scroll
    var imagename = "blog.banner_image.details";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.banner_image_Transforms) {
        processedImages = props?.imagetransforms?.banner_image_Transforms;
    }

    return (
        <section className="news-detail-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <div className="news-detail-desc inner-detail-desc">
                            {props?.banner_image &&
                                <div className="news-detail-img first-img">
                                    <ImageModule ImageSrc={props?.banner_image} altText={props?.banner_image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                                </div>
                            }

                            {props?.add_blog_content?.length > 0 && props.add_blog_content?.map((module, index) => {
                                return (
                                    <>
                                        {module.strapi_component === "page-modules.plain-content" && <ContentModule Content={module.content?.data?.content} />}
                                        {module.strapi_component === "page-modules.image" &&
                                            <div className="news-detail-img">
                                                <ImageModule ImageSrc={module?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                                            </div>}
                                        {module.strapi_component === "page-modules.accordion" && <NewsDetailAccordion data={module.add} />}
                                    </>
                                )
                            }
                            )}



                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`news-detail-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                <NewsDetailSubscribe />
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                                <PropertyValuationCard />
                            </ScrollAnimation>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewsDetailDesc