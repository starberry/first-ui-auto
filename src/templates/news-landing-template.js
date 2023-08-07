import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import SEO from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const ListingIntroModule = loadable(() => import("../components/ListingIntroModule/ListingIntroModule"));
const NewsTab = loadable(() => import("../components/NewsTab/NewsTab"));
const InnerPagination = loadable(() => import("../components/InnerPagination/InnerPagination"));
const ValuationModule = loadable(() => import("../components/ValuationModule/NewsletterModule"));
const SocialWallTab = loadable(() => import("../components/SocialWallTab/SocialWallTab"));
const AreaGuides = loadable(() => import("../components/AreaGuideLanding/AreaGuideLanding"));
const ReviewBadge = loadable(() => import("../components/ReviewsSlider/ReviewBadge"));

const News = ({ data }, props) => {
  const PageData = data?.strapiPage
  const allNews = data?.allStrapiBlog.edges
  const elfData = data?.site.siteMetadata?.elfSight
  return (
    <LayoutTwo popularSearch={PageData?.select_popular_search?.title}>
      <div className="layout-padding-top">

        <BreadcrumbModule parentname={PageData.choose_menu[0]?.strapi_parent?.title} parent={PageData.choose_menu[0]?.strapi_parent?.slug} pagename={PageData.title} />

        <div className="grey-bg">
          {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
            return (
              <>{module.strapi_component === "page-modules.global-module" && module.select_module === "blog" && <>
                <NewsTab data={allNews} />
                <InnerPagination /></>}
                {module.strapi_component === "page-modules.global-module" && module.select_module === "social_wall" && elfData.review && <Container>
                  <Row>
                    <Col>
                      <ReviewBadge code={elfData.social_wall} />
                    </Col>
                  </Row>
                </Container>}
                {module.strapi_component === "page-modules.global-module" && module.select_module === "area_guide" && <AreaGuides />}
                {module.strapi_component === "page-modules.plain-content" && <ListingIntroModule headingTitle={PageData.title} content={module.content} />}
                {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
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

export default News


export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
              ...GlobalModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
              ...ImageAndContentFragment
            }
        }
    }
    allStrapiBlog(filter: {publish: {eq: true}}, sort: {fields: date, order: DESC}) {
        edges {
          node {
            date(formatString: "DD MMM, yyyy")
            title
            slug
            strapi_id
            tile_image {
              alternativeText
              url
            }
            category {
                strapi_json_value
            }
            imagetransforms {
              tile_image_Transforms
            }
          }
        }
    }
    
    site {
      siteMetadata {
          elfSight {
            review
            social_wall
          }
      }
    }
  }
`