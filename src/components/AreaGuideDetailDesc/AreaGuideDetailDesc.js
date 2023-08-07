import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import SocialShare from "../SocialShare/SocialShare";
import './assets/styles/_index.scss';

const NewsDetailAccordion = loadable(() => import("../NewsDetailAccordion/NewsDetailAccordion"));
const PropertyValuationCard = loadable(() => import("../PropertySidebar/PropertyValuationCard"));
const NewsDetailSubscribe = loadable(() => import("../NewsDetailSubscribe/NewsDetailSubscribe"));
const ImageModule = loadable(() => import("../../modules/image-render"));
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const AreaGuideDetailDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 250)
        })
    }, [])
    // Sticky scroll
    var imagename = "area-guide.banner_image.details1";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.banner_image_Transforms) {
        processedImages = props?.imagetransforms?.banner_image_Transforms;
    }

    return (
        <section className="news-detail-desc-wrapper areaguide-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <div className="news-detail-desc inner-detail-desc">
                            {props?.add_content?.length > 0 && props.add_content?.map((module, index) => {
                                return (
                                    <>
                                        {module.strapi_component === "page-modules.plain-content" && <ContentModule Content={module.content?.data?.content} />}
                                        {module.strapi_component === "page-modules.accordion" && <NewsDetailAccordion data={module.add} />}
                                        {module.strapi_component === "page-modules.image" &&
                                            <div className="news-detail-img">
                                                <ImageModule ImageSrc={module?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                                            </div>
                                        }
                                    </>
                                )
                            }
                            )}
                            <div className="areaguide-share">
                                <SocialShare
                                    iconClass="icon icon-share"
                                    shareText="Share"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`news-detail-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <NewsDetailSubscribe />
                            <PropertyValuationCard />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AreaGuideDetailDesc