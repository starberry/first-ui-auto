import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import LayoutTwo from "../components/layoutTwo";
import SEO from "../components/seo"
import EstasReview from "../components/EstasReview/EstasReview";
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const Banner = loadable(() => import("../components/Banner/Banner"));
const TestimonialSlider = loadable(() => import("../components/TestimonialSlider/TestimonialSlider"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));
const ReviewBadge = loadable(() => import("../components/ReviewsSlider/ReviewBadge"));
const AllAgents = loadable(() => import("../components/AllAgents/AllAgents"));

const Testimonials = ({ data }, props) => {
    const PageData = data?.strapiPage
    const elfData = data?.site.siteMetadata?.elfSight
    const allAgentData = data?.site.siteMetadata?.allAgent
    const estasData = data?.site.siteMetadata?.estasReviews
    let isAnyReview = ((elfData.review && elfData.review_page) || allAgentData.review || estasData.review)

    return (
        <LayoutTwo popularSearch={PageData?.select_popular_search?.title} customClass={"reviews-page"}>
            <div className="layout-padding-top">
                <BreadcrumbModule parentname={PageData.choose_menu[0].strapi_parent.title} parent={PageData.choose_menu[0].strapi_parent.slug} pagename={PageData.title} />
                <Banner tag="landing" title={PageData.title} {...PageData.banner} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms?.banner_section_banner_image_Transforms} />
                {/* <Banner
                    tag="landing"
                    bannerTitle="Customer Reviews"
                /> */}

                {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                    return (
                        <>
                            <div className="testimonial-wrapper">
                                <Container>
                                    {module.strapi_component === "page-modules.video-review" &&
                                        <TestimonialSlider data={module.add} id={PageData.strapi_id} />
                                    }
                                    {(module.strapi_component === "page-modules.global-module" &&
                                        module.select_module === "google_reviews_all" &&
                                        isAnyReview) &&
                                        <div className="widget-wrapper">
                                            <h1>Real reviews from real customers.</h1>
                                            {elfData.review && elfData.review_page &&
                                                <div className="elf-review-page-module">
                                                    <ReviewBadge code={elfData.review_page} />
                                                </div>
                                            }
                                            {allAgentData.review &&
                                                <div className="elf-review-page-module">
                                                    <AllAgents code={allAgentData.id} />
                                                </div>
                                            }
                                            {estasData.review &&
                                                <EstasReview estas_key={estasData.estas_key} />
                                            }
                                        </div>
                                    }
                                </Container>
                            </div>
                            {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
                        </>
                    )
                })}
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

export default Testimonials


export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
              ...GlobalModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_VIDEO_REVIEW {
              ...VideoReviewFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
              ...ImageAndContentFragment
            }
        }
    }

    site {
        siteMetadata {
            elfSight {
              review
              review_badge
              review_carousel
              review_page
            }
            allAgent {
              review
              id
            }
            estasReviews {
                review
                estas_key
            }
        }
      }
  }
`