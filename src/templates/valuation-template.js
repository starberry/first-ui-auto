import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import LayoutTwo from "../components/layoutTwo";
import SEO from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const EnquiryIntro = loadable(() => import("../components/EnquiryIntro/EnquiryIntro"));
const ValuationCard = loadable(() => import("../components/ValuationCard/ValuationCard"));

const Valuation = ({ data }, props) => {
    const PageData = data?.strapiPage
    return (
        <LayoutTwo popularSearch={PageData?.select_popular_search?.title} customClass={PageData?.custom_css_classname ? PageData?.custom_css_classname : ""}>
            <div className="layout-padding-top">
                <BreadcrumbModule pagename={PageData.title} />

                <div className="grey-bg">
                    {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                        return (
                            <>
                                {module.strapi_component === "page-modules.plain-content" && index === 0 && <EnquiryIntro titlesm={PageData.title} {...module} />}
                                {module.strapi_component === "page-modules.valuation-module" &&
                                    <div className="valuation-form-wrapper">
                                        <Container>
                                            <Row className="d-flex justify-content-center">
                                                <Col xl={7}>
                                                    <div className="valuation-card-wrapper-main">
                                                        {module.add_details && module.add_details.map((item, index) => {
                                                            return (
                                                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={index * 100} offset={10}>
                                                                    <ValuationCard {...item} title={item.title} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />
                                                                </ScrollAnimation>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                    {/* <Row>
                                                        {module.add_details && module.add_details.map((item, index) => {
                                                            return (
                                                                <Col md={6}>
                                                                    <ValuationCard {...item} title={item.title} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />
                                                                </Col>
                                                            )
                                                        }
                                                        )}
                                                    </Row> */}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                }
                            </>
                        )
                    }
                    )}
                </div>
            </div>
        </LayoutTwo>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiPage
    return (
        <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title} />
    )
}

export default Valuation


export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_VALUATION_MODULE {
              ...ValuationModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
        }
    }
  }
`